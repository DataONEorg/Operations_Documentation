Glossary
========

.. glossary::

   CN
   Coordinating Node
     A server that implements the DataONE Coordinating Node API.

   Environment
     The collection of Coordinating Nodes, Member Nodes, and applications (e.g. search interface) that work together as a federation. There is a single *Production Environment* and several test environments.

   Environment DNS
     The DNS entry that all systems interacting with CNs in and Environment should use. During maintenance, the Environment DNS entry will be adjusted to point to another CN in the same Environment, thus helping to ensure ongoing availability of services while other CNs are offline. For example, the DataONE Production Environment has three CNS, ``cn-ucsb-1.dataone.org``, ``cn-unm-1.dataone.org``, and ``cn-orc-1.dataone.org``. The Environment DNS is ``cn.dataone.org`` and points to one of the three CNs. The Environment DNS entry has a relatively short TTL, and its associated IPAddress should not be cached for more than a few seconds.

   MN
   Member Node
     A server that implements the DataONE Member Node API.

   Primary CN
   Primary Coordinating Node
     The CN on which the ``d1-processing`` daemon is running. The Primary CN must always have the :term:`Environment DNS` pointing to it.
  
   read-only mode
     The state of an environment when updates to content throught the DataONE service interfaces is disabled. Services including ``resolve``, ``get``, ``getSystemMetadata``, ``getLogRecords``, and ``search`` continue to function enabling user access to the content without disruption.