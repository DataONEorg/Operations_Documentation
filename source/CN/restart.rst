System Restart
==============

A kernel upgrade on a Coordinating Node requires a system restart. Restarting a CN requires that the environment is placed in :term:`read-only mode` to help avoid content inconsistency between the CNs operating within an :term:`Environment`. Restarting the :term:`Primary CN` in an Environment requires that the :term:`Environment DNS` be switched to another CN so the read only service (resolution, retrieval, and search) remain available to clients. The DNS switch is required in the production environment and is optional in the various test environments.


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
       tomcat
       **d1-processing**
     }

     class CN-2 {
       ldap
       postgres
       apache
       zookeeper
       solr
       tomcat
       **d1-index-task-generator**
       **d1-index-task-processor**
     }

     class CN-3 {
       ldap
       postgres
       apache
       zookeeper
       solr
       tomcat
     }
   }

   DNS --> "CN-1"

   note left of CN-1
     Primary CN
     Environment DNS entry 
     points to this node.
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

*Figure 1.* Typical setup of Coordinating Nodes in an environment. When restarting 
*CN-1* it is necessary to change the Environment DNS to point to one of the other 
nodes so that operations such resolve and external applications (e.g. Search UI) 
continue to function.


**Procedure**

1. Broadcast notification

2. Set :doc:`read-only mode <readonly>`

3. Update non-primary nodes (*Indexing CN* and *Third CN*), avoiding an update 
   of DataONE packages::

     #optional hold on DataONE packages
     sudo apt-mark hold dataone*
     sudo apt-get update
     sudo apt-get dist-upgrade
     #when ready, restart the server
     sudo reboot
   
   ::    

     #undo hold on DataONE packages
     sudo apt-mark unhold dataone*
     # verify new kernel running
     uname -r

4. Switch DNS to a non-primary node. For example, switch the environment DNS entry 
   to point to the *Indexing CN*.

5. Update the remaining node. As for #4.

6. Switch DNS back to the original primary node.

7. Leave :doc:`read-only mode <readonly>`

8. Broadcast notification


