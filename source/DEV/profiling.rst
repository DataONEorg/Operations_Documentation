Profiling Java Applications
===========================

There are a number of tools available for profiling Java applications.

JProfiler
---------

The commercial JProfiler_  is able to remotely connect to a running instance of a 
JVM and provide useful statistics on activity. 


Generating Flamegraphs
----------------------

Flamegraphs_ show the relative time spent in different operations and the 
hierarchy of calls needed to service an operation. Hierarchy is shown in the 
vertical stack. Horizontal placement has no significance as output is 
aplhabetically ordered.

The following steps were followed to generate flamegraphs for CN operations 
using cn-dev-ucsb-2.test.dataone.org as the example.

Build the libagent.so c-lib (can be shared across systems using the same version 
of gcc)

::

  sudo apt-get install cmake
  sudo apt-get install build-essential
  mkdir profiling
  cd profiling
  git clone https://github.com/jvm-profiling-tools/honest-profiler.git
  cd honest-profiler/
  export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
  cmake CMakeLists.txt
  export LC_ALL=C
  make

Setup the profiler application::

  cd ~/profiling
  mkdir profiler
  cd profiler
  wget http://insightfullogic.com/honest-profiler.zip
  unzip honest-profiler.zip
  # copy the previously built libagent.so
  cp ../honest-profiler/build/liblagent.so .

Get tool to convert profiler output for flamegraph generation::

  cd ~/profiling
  git clone https://github.com/cykl/hprof2flamegraph.git

Setup output folder and permissions (tomcat will be run as tomcat7 user)::

  sudo chgrp tomcat7 ~/profiling
  sudo chmod g+w ~/profiling
  # also enable write to a destination folder
  sudo mkdir /var/www/profiling
  sudo chgrp sudo /var/www/profiling
  sudo chmod -R g+w /var/www/profiling

Generated flamegraphs will be at https://host.name/profiling/

Script to start tomcat7 for profiling (cn-dev-2 configuration), 
``start_tomcat``::

  #!/bin/bash
  PDIR=/home/vieglais/profiling
  if [ "$#" -ne 2 ]; then
    echo "Must provide log name (no extension) and titles as parameters."
    exit 1
  fi

  LOG_FILE=${PDIR}/${1}
  FG_PARAMS="--width=2000 --title='${2}'"

  sudo -u tomcat7 /usr/lib/jvm/java-8-openjdk-amd64/bin/java \
  -agentpath:${PDIR}/profiler/liblagent.so=interval=1,logPath=${LOG_FILE}.hpl,start=0,host=127.0.0.1,port=9999 \
  -Djava.util.logging.config.file=/var/lib/tomcat7/conf/logging.properties \
  -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager \
  -Djava.awt.headless=true \
  -XX:+PreserveFramePointer \
  -Xmx8192m \
  -XX:+UseParallelGC \
  -Xms1024M \
  -XX:MaxPermSize=512M \
  -Djava.endorsed.dirs=/usr/share/tomcat7/endorsed \
  -classpath ${PDIR}/profiler/honest-profiler.jar:/usr/share/tomcat7/bin/bootstrap.jar:/usr/share/tomcat7/bin/tomcat-juli.jar \
  -Dcatalina.base=/var/lib/tomcat7 \
  -Dcatalina.home=/usr/share/tomcat7 \
  -Djava.io.tmpdir=/tmp/tomcat7-tomcat7-tmp \
  org.apache.catalina.startup.Bootstrap start

  # Process log into svg
  python hprof2flamegraph/stackcollapse_hpl.py ${LOG_FILE}.hpl > ${LOG_FILE}.txt
  hprof2flamegraph/flamegraph.pl ${FG_PARAMS} ${LOG_FILE}.txt > ${LOG_FILE}.svg
  cp ${LOG_FILE}.svg /var/www/profiling/

``p_start`` script to start profiling data collection after service has started::

  #/bin/bash
  echo start | nc 127.0.0.1 9999

``p_stop`` script to stop profiling data collection::

  #/bin/bash
  echo stop | nc 127.0.0.1 9999

Script to warm up tomcat a bit, start data collection, execute a call and stop 
data collection, e.g. ``test_viewservice``::

  #!/bin/bash

  SVC_URL="https://cn-dev-ucsb-2.test.dataone.org/cn/v2/views/metacatui/"
  PIDS="ajpelu.6.8 ajpelu.6.9 Akasha.16.1 Akasha.16.2 Akasha.16.3 Akasha.16.4 Akasha.16.5 Akasha.16.6 Akasha.16.7 Akasha.16.8"
  #Warm up tomcat a little
  for PID in ${PIDS}; do
    curl "${SVC_URL}${PID}" > /dev/null
  done

  ./p_start
  curl "${SVC_URL}doi%3A10.5063%2FF1R49NQB" > /dev/null
  ./p_stop

The process to generate a profile is then:

1. Open two terminals and cd into ``~/profiling``
2. Put the environment into read-only mode, on the primary CN::

     sudo d1processingstate FALSE
     sudo service d1-processing stop

3. In one terminal, shutdown the tomcat7 service and startup the script to run 
   tomcat7 (script will ask for sudo)::

     sudo service tomcat7 stop
     ./start_tomcat view_service "cn/v2/views/metacatui"

4. Wait for tomcat to fire up. This takes about 100 seconds or so...
5. In the other terminal, run ``test_viewservice``
6. After ``test_viewservice`` is done, shutdown tomcat7 with a ctrl-c in the 
   first terminal.
7. View the resulting flamegraph in your web browser by visiting::

   https://cn-dev-ucsb-2.test.dataone.org/profiling/view_service.svg



.. _JProfiler: https://www.ej-technologies.com/products/jprofiler/overview.html
.. _Flamegraphs: http://www.brendangregg.com/FlameGraphs/cpuflamegraphs.html