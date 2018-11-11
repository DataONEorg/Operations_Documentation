Continuous Build System
=======================

The continuous build system is a Jekins instance that builds and tests Java components used by DataONE.

Location: http://jenkins-1.dataone.org/jenkins/


Maven Repository
----------------

:URL: `https://maven.dataone.org <https://maven.dataone.org>`_

Artifacts are deployed to the maven repository on successful project builds.

The maven repository is indexed using the `Maven::Indexer CLI <http://maven.apache.org/maven-indexer/indexer-cli/index.html>`_

::

  sudo /etc/cron.daily/maven-index



Backup Jenkins Configurations
-----------------------------

::

  HUDSON_HOME="/var/lib/jenkins/"
  B_DEST="/var/lib/jenkins-backup"
  rsync -r  --delete --include "jobs/" --include "users/" --include "*.xml" \
  --include "jobs/*/config.xml" --include "users/*/config.xml" \
  --include "userContent/*" \
  --exclude "jobs/*/builds" --exclude "jobs/*/last*" --exclude "jobs/*/next*" \
  --exclude "*.log" --exclude "jobs/*/workspace*" --exclude "jobs/*/cobertura" \
  --exclude "jobs/*/javadoc" --exclude "jobs/*/htmlreports" --exclude "jobs/*/ncover" \
  --exclude "jobs/*/modules"\
  --exclude "users/*/*" --exclude "/*" --exclude ".svn" --exclude "svnexternals.txt" \
  ${HUDSON_HOME} ${B_DEST}/backup/

 rsync -r  --delete \
  --include="jobs/" \
  --include="*.xml" \
  --include="jobs/*/config.xml" \
  --include="users/*/config.xml" \
  --include="userContent" \
  --exclude-from="excludes.txt" \
  ${HUDSON_HOME} ${B_DEST}/backup/

  --exclude="*.java*" \
  --exclude=".*" \
  --exclude=".*/" \
  --exclude="fingerprints/" \
  --exclude="secrets/" \
  --exclude="*secret*" \
  --exclude="identity.*" \
  --exclude="jobs/*/builds" \
  --exclude="jobs/*/last*" \
  --exclude="jobs/*/next*" \
  --exclude="*.log" \
  --exclude="jobs/*/workspace*" \
  --exclude="jobs/*/cobertura" \
  --exclude="jobs/*/javadoc" \
  --exclude="jobs/*/htmlreports" \
  --exclude="jobs/*/ncover" \
  --exclude="jobs/*/modules"  \
  --exclude="*.tar" \
  --exclude=".svn" \
  --exclude="svnexternals.txt" \
  ${HUDSON_HOME} ${B_DEST}/backup/

  jobs/*/cobertura
  jobs/*/javadoc
  jobs/*/htmlreports
  jobs/*/ncover
  jobs/*/modules

