Baseline Member Node Implementation Requirements
================================================

.. note:: 2018-02-19

   This document is in draft status, copied mostly verbatim from subversion at: https://repository.dataone.org/documents/Projects/cicore/operations/source/member_node_deployment


All Member Nodes, regardless of Tier, share the same baseline requirement of
managing their object collection such that:

1. All objects are identified by a globally unique identifier.

  Identifiers provide the primary mechanism for users to access a specific
  item. Identifiers must conform to the DataONE persistent identifier
  specification.

2. The original bytes of submitted objects are always available using the
original identifier.

  To satisfy DataONE's preservation policy, the content bound to an identifier
  does not change and is thus immutable. Organizations starting with systems
  that allow overwrites will need additional mechanisms to ensure access to
  older versions (via `MN_Read.get()`)

3. Content access policies are respected.

  Tier 2 and higher nodes satisfy this requirement by implementing the API and
  following the functional requirements for access control implementation. By
  implication, Tier 1 nodes can only host and expose public objects.

4. Updates are treated as a separate objects.

  An update to an existing object causes creation of a new object and a new
  identifier, and the object being replaced is archived. (Archiving removes
  the object from the search index, but leaves it available via `MN_Read.get()`.
  The *isObsoletedBy / obsoletes* relationship is established in the system
  metadata of both objects to allow navigation through the version chain.)

5. Voluntary deletes are handled as archive actions.

  Objects published to DataONE are not deleted, but archived. This helps
  ensure DataONE's preservation requirements are upheld. An archived object
  has its `archived` field set to `true` in its systemMetadata, and the object
  remains accessible by its identifier. This applies to all objects ever
  exposed through the DataONE API regardless of how the content is added to a
  Member Node. For example, if a Member Node manages their collection with
  external tools, the system should behave such that deleted content is
  treated as archived, rather than actually deleted.

6. Compulsory (or administrative) deletes, are coordinated and executed via
the DataONE Coordinating Nodes.

  These are true deletes where the content is removed from all nodes, and is
  done ONLY in cases when illegal or inappropriate content is discovered and
  needs to be removed. Because content may be replicated to other nodes,
  a Member Node performing a compulsory delete must notify DataONE of the
  action to ensure any replicas are also removed. Otherwise the content
  may remain discoverable and accessible at other nodes.


Note that the Tier 3 MN_Storage API implements requirements 4, 5, and 6, and
exposes that functionality to authorized users. Tier 1 and 2 member nodes
still implement the same functionality, however they do not expose the
functionality through the DataONE MN_Storage API. Instead, creates, updates,
and archives are handled through non-DataONE mechanisms.
