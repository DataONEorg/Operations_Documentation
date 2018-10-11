Select the DataONE Tier
=======================

While Member Nodes share the same :doc:`baseline-implementation-requirements` of 
managing their object collections, selecting a Tier level for implementation is 
a matter of deciding how much of the DataONE Member Node API your organization 
is ready to implement.  DataONE has defined several tiers, each of which 
designates a certain level of functionality exposed through the MN API. The tiers 
enable MN developers to implement only the methods for the level at which they 
wish to participate in the DataONE infrastructure.

Each tier implicitly includes all lower numbered tiers. For instance, a Tier 3
MN must implement tiers 1, 2 and 3 methods.

The tiers range from a simple, public, read only MN, to a fully implemented,
writable MN that enables replica storage for other MNs.

The `DataONE MN APIs`_ are defined in groups that correspond to the tiers.

The tiers are as follows:

* **Tier 1**: Read, public objects (MNCore and MNRead APIs)

  Provides read-only access to publicly available objects (Science Data, science
  metadata, and Resource Maps), along with core system API calls for monitoring
  and logging.


* **Tier 2**: Access control (MNAuthentication API)

  Allows the access to objects to be controlled via access control list (ACL)
  based authorization and certificate-based authentication.  


* **Tier 3**: Write (MNStorage API)

  Provides write access (create, update and archive objects).

  Allows using DataONE interfaces to create and maintain objects on the MN.


* **Tier 4**: Replication target (MNReplication API)

  Allows the DataONE infrastructure to use available storage space on the MN for
  storing copies of objects that originate on other MNs, based on the `Node
  Replication Policy`_.


.. Note:: Support for the Node Replication Policy used by Tier 4 MNs is currently
  under development on the Coordinating Nodes and a Tier 4 MN may currently
  receive requests to replicate content which should be blocked by its Node
  Replication Policy.


.. Note:: MN developers may choose to implement the tiers in separate phases.
  For instance, a MN can initially be implemented and deployed as a Tier 1 MN
  and operated as such while higher tiers are implemented.
  
  Despite the Tier level, content maintained (created,
  updated, archived) outside of the DataONE API (but represented through it) is 
  expected to conform to DataONE requirements.


.. _`Node Replication Policy`:
  http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.NodeReplicationPolicy

.. _`DataONE MN APIs`:
  http://mule1.dataone.org/ArchitectureDocs-current/apis/MN_APIs.html
