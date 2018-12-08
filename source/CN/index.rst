Coordinating Nodes
==================

.. uml::
   :align: left

   skinparam monochrome true

   class DNS {
     cn.dataone.org
   }

   package "Environment" {

     class CN-1 {
       ldap
       postgres
       apache
       zookeeper
       solr
       tomcat7
       **d1-processing**
     }

     class CN-2 {
       ldap
       postgres
       apache
       zookeeper
       solr
       tomcat7
       **d1-index-task-generator**
       **d1-index-task-processor**
     }

     class CN-3 {
       ldap
       postgres
       apache
       zookeeper
       solr
       tomcat7
     }
   }

   DNS --> "CN-1"

   note left of CN-1
     **Primary CN**
     Environment DNS entry 
     points to the node 
     running d1-processing
   end note

   note top of CN-2
     Indexing CN
   end note

   note top of CN-3
     Third CN
   end note

   "Search UI" .. DNS
   "Resolve" .. DNS

   hide circle
   hide methods

*Figure 1.* Typical setup of Coordinating Nodes in an environment. The primary 
CN is the CN with the environment DNS entry pointing to it. The primary CN must
have ``d1-processing`` running on it. The indexing CN is the CN that has both
``d1-index-task-generator`` and ``d1-index-task-processor`` running on it. The
indexing CN may also be the primary CN.  All CNs in an environment have ``ldap``,
``postgres``, ``apache``, ``zookeeper``, ``solr``, and ``tomcat7`` running on 
them.

.. toctree::
   :maxdepth: 2
   :caption: Operations:

   readonly
   restart_services
   restart
   reindex
   approve_mn


.. toctree::
   :maxdepth: 1
   :caption: Topics:

   configuration
   searchui
   letsencrypt
   diagnostic_api

