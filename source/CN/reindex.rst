Reindexing Content
==================





::

  $ cd /usr/share/dataone-cn-index/
  $ sudo java -jar d1_index_build_tool.jar -h
  DataONE solr index build tool help:

  This tool indexes objects the CN's system metadata map.
     Nothing is removed from the solr index, just added/updated.

  Please stop the d1-index-task-processor while this tool runs:
         /etc/init.d/d1-index-task-processor stop
  And restart when the tool finishes:
         /etc/init.d/d1-index-task-processor start

  -d     System data modified date to begin index build/refresh from.
         Data objects modified/added after this date will be indexed.
         Date format: mm/dd/yyyy.

  -a     Build/refresh all data objects regardless of modified date.

  -c     Build/refresh a number data objects, the number configured by this option.
          This option is primarily intended for testing purposes.

  -pidFile   Refresh index document for pids contained in the file path
             supplied with this option.  File should contain one pid per line.

  -migrate   Build/refresh data object into the next search index
               version's core - as configured in:
                /etc/dataone/solr-next.properties
  Exactly one option amoung -d or -a or -pidFile must be specified.

  So, I usually create a pid list using MN.listObjects(), save it to, say, /tmp/pids.txt, and then use:

  sudo java -jar d1_index_build_tool.jar -pidFile/tmp/pids.txt

  (notice the no space between the pidFile option and the path argument).
