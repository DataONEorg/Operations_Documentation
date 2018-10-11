Mutable Content Member Node Development
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:Document Status:

  ======== ==================================================================
  Status   Comment
  ======== ==================================================================
  DRAFT    (Nahf) Initial draft
  ======== ==================================================================


Purpose
========
This document is meant as an introduction to the DataONE infrastructure for 
operators of repositories that manage persistent mutable entities and wish to join
DataONE as a Member Node.  Member Nodes are required to provide access to identified,
immutable entities, so the challenge for these repositories is to meet that 
requirement. This document will layout the concepts needed to determine the best
implementation approach, whether it be internalizing version-level persistence
and implementing the DataONE Member Node API, going the Slender Node route, or 
deploying a pre-build Member Node and publishing selected versions to it.  


Terminology
===========
Because DataONE has a different storage model from repositories of mutable content, 
great care has been taken in this document to avoid ambiguous or overloaded terminology.
To that end, some terms are defined up front to avoid confusion. 

**entity**
  the uniquely identified, persisted electronic item being stored, whether mutable or not, in the MN repository
**object**
  a uniquely identified, persisted and immutable representation of the entity, with the semantics of "version".
**version**
  synonymous with object, also implying immutability.
**immutable**
  functionally, an entity is immutable if a byte-for-byte equivalent representation
  is retrievable indefinitely, verifiable by checksum comparison.  
**series**
  the ordered set of objects that arise from a changing entity.
**series head**
  the most current object of a series
**system metadata**
  (*a.k.a.* sysmeta)  the DataONE metadata document that contains all of
  the administrative properties of the object.  There is one sysmeta per object.


Synopsis
========
DataONE manages the synchronization and replication of persisted, immutable versions
of entities it calls objects. For repositories that manage mutable entities, the
main challenge is how to reflect these mutable entities as immutable objects.
As of version 2, DataONE supports this through recognition of an additional identifier
field for the mutable entity, as long as a unique identifier for the version is
also still provided.  
 
With these two identifiers, DataONE can see Member Nodes that manage mutable content 
as Member Nodes that host only the latest version of an entity.  Over time, it will 
synchronize and replicate a significant portion of those versions as immutable objects, 
and be able to resolve the entity identifier to the object representing the most 
current version of that series.
 
This approach can lead to complexities that increase with the volatility of 
the entity and removal of past-version system metadata records.  In the case of 
highly volatile entities, the main issue is the reliability of the current object 
getting persisted as an object in DataONE, and being useful for data consumers.  
In the case of removal of past-version system metadata, the main issue is object 
orphaning (the inability to further maintain the synchronized objects).

MN API implementers will also need to be able to reflect their data management 
actions into actions understood by DataONE. The final section will be devoted to
recipes for a wide range of potential data management actions.


Important Concepts
==================

Determining Content Immutability
================================

The MNRead API is primarily an API for versions, with layered semantics that allow 
the retrieval of the head of a series.  When presented an object identifier, MN 
Read API methods MUST return the byte array originally persisted as that object.
DataONE ensures this by periodically validating the checksum of the object, and 
flagging any copy of an object it finds invalid.

Even if persisted faithfully, repository owners should be aware of any post-processing 
that might occur during object retrieval, either within the application, or the 
web server container, and take steps to eliminate them, as they are potential 
sources of mutability, especially with software component upgrades.


Synchronization and Replication
--------------------------------
Through synchronization, DataONE registers new objects to its collection, and for
objects of type METADATA and RESOURCE_MAP, replicates the objects to the CN for
downstream index processing. Synchronization also triggers Member Node replication 
of DATA objects, which is a process that sends requests to volunteering Member Nodes 
to preserve the object bytes.  Under typical operating conditions, this process can
take from 3 to 20 minutes.  Under periods of routine maintenance, these services
can be down for 3 - 24 hours.  Other variables that can impact this time is the
amount of backlog synchronization has to work through, the Member Node's synchronization
schedule, and network problems.  

For Member Nodes of mutable content, the main concern is whether the version of the 
entity remains available between the time it is queued for synchronization, and 
when it is retrieved.

Update Location
----------------
The update location for each object is the authoritative Member Node listed in 
an object's system metadata.  The update location is the only Node where changes
to an entity (reflected as creation of a related object) or an object's system 
metadata can take place. This is done both to avoid race conditions (changes coming 
from two locations on the system at the same time), and to prevent other users from 
accidentally or intentionally registering objects on other Member Nodes and 
effectively hijacking control of an entity. 

Updated entities and system metadata from the authoritative Member Node get 
synchronized to the DataONE CNs, and replicated out to MNs listed as replica 
nodes for that object.  Attempted updates originating from any other node are rejected.

If the listed authoritative Member Node of an object no longer has that system
metadata, it is said to have been orphaned, making it difficult to update system
metadata properties without administrative intervention.


DataONE update logic
--------------------
Since DataONE persists only immutable objects, an update to an entity is accomplished
by creating a new object that references its predecessor through the 'obsoletes' property
in the system metadata, as well as associating the entity identifier.  The obsoletes
reference is vital for MNs that only expose immutable objects, and the association
of the entity identifier vital for MNs that manage mutable entities and don't 
maintain system metadata for previous versions exposed as objects.


Preferred Implementation
=========================
The two main problems to be overcome by Member Nodes of mutable content are decreased 
retrieval reliability and object orphaning.

Of the two, the least burdensome of the two to address is object orphaning.  The idea
is to keep system metadata for all exposed versions, regardless of whether or not
the object corresponding to the version is still retrievable.  Doing so ensures 
Member Node local control over all synchronized versions, and avoids orphaning 
the object.  It also provides DataONE with more reliable provenance to allow better
resolution of the entity identifier to the latest object available.

This can be accomplished either by following the slender node design (GMN configured 
to use the Remote URL mode), or building system metadata storage into the custom 
implementation.  

The second problem, decreased retrieval reliability, is directly related to the 
ability of DataONE to successfully synchronize and replicate each version as an 
object.  The unavoidable synchronization lag is the main factor to this problem, as is the 
volatility of the entity.  Highly volatile or regularly changing entities will 
frustrate synchronization attempts, as will DATA entities that disallow replication.

A worst case scenario is an end-user calling cn.resolve using the entity identifier
which points back to the latest known version on the Member Node, but that returns
a NotFound because the newer version is still waiting to be synchronized, and the
older version is no longer hosted.  In this way, a published object can temporarily
be NotFound on the DataONE systems.

Ideally, a local cache of previous versions is maintained to compensate for the
worst of synchronization lags, on the order of 24 hours to 3 days.

 
Identifying versions as immutable objects
=========================================
Assuming that the entities to be exposed to DataONE can reasonably be expressed
as a series of immutable objects, the task is to properly identify and describe
each version.  The rules for this are straightforward:

#. Each version MUST be assigned an object identifier that is globally unique
   and IS NOT the entity identifier.  This identifier is mapped to the *identifier* property.
   
#. Each version MUST have the entity identifier associated to it via the *seriesId* property.

#. The object identifier MUST be able to retrieve the same byte array as was
   determined when the version was identified, for as long as that object is 
   available on the Member Node.
   
The object identifier is the identifier used within DataONE to facilitate synchronization,
and indexing.  The entity identifier as *seriesId* will be used to logically
relate all objects of the series, and allow resolution to the latest version via 
the DataONE search interface.

Any time a change is made to the mutable entity that would result in a different
byte array being returned from the MNRead.get(id) call, the Member Node MUST identify
another version and create a new system metadata document for it.

Complete requirements for handling changes are found in the update section below.

  :identifier: <versionIdentifier>
  :seriesId: <entityIdentifier>

It is worth mentioning that version identifiers cannot be reused for other content
even after they are no longer in use on the Member Node (see later sections on 
dealing with multiple versions).
 





Identifier Resolution in READ APIs
==================================
DataONE relies on Member Nodes to provide faithful access to the specific versions
of entities it hosts.  Specifically:

- MNRead.get(persistent identifier) MUST return either the specified version, or
  NotFound if it no longer has it.
   
- MNRead.get(persistent identifier) MUST NOT return any other version!
 
- MNRead.get(series identifier) MUST return the object representing the latest
  hosted version, or NotFound if not recognized.
   
- ======>  are there any other situations (deletes) to consider?
 
- MNRead.getSystemMetadata(persistent identifier) MUST return the system metadata
  of the specified version, or NotFound if it not longer has the system metadata
  for that version.  It SHOULD return the system metadata even if it doesn't have
  the object bytes anymore.
 
CNRead.resolve logic
---------------------
CNRead.resolve is a centralized method to direct users to the location
of the object requested, and is the primary method for data consumers to access
discovered objects.  It does this in two steps:

#. if given an identifier that is a SID, determine the PID that represents the most 
   current version.
   
#. return the locations of that current PID and provide an HTTP redirect of the request 
   to the MNRead.get(currentPID) to one of those locations.

- ==== note to self =====>  in the redirect URL, resolve should prefer replica nodes 
  to the authoritativeMN, at least for Mutable Member Nodes, because it lessens the 
  chance of NotFounds.
   
- ==== note to self =====> a good reason to track the data storage model of MNs 
  in the (CN controlled section of) Node Properties.


Determining the current PID
----------------------------
 * DataONE uses the obsoletes , obsoletedBy, and dateUploaded properties to determine
   the current version of an entity. 
   
 * As explicit indications of ordering, obsoletes and obsoletedBy information takes priority
 
 * dateUploaded is used to if there are two or more versions that are not obsoleted
 
 * mutable member nodes are more prone to missing versions and obsoletedBy information,
   so rely heavily on the accuracy of the dateUploaded field.


Entity Creation
===============
When a new entity is created in a Mutable Member Node, a corresponding system metadata
document must also be created containing all of the required administrative properties
of that object.  This includes:

System Metadata:

  :identifier: a version Identifier
  :seriesId: the entity Identifier
  :checksum: the checksum of the version
  :size: byte-length of the version
  :dateUploaded: the version creation date
  :obsoletedBy: null 
  :obsoletes: null, typically
  


Renaming Entities 
=================
Once registered, identifiers cannot be disassociated from the object originally
assigned.  Therefore, renaming an entity is achieved by creating a new PID (version identifier)
and SID (the new entity identifier).  While this causes a duplicate object, the 
duplication is acceptable. Entity renaming follows the semantics of updates, except
the checksum and size will be inherited from the previous object.

Previous System Metadata for A1:

  :identifier: A1
  :seriesId: S1
  :dateUploaded: t1
  :checksum: C1
  :size: Z1
  
New System Metadata for A2:

  :identifier: A2
  :seriesId: S2
  :dateUploaded: t2 (where t2 > t1)    <====== question: can t2 = t1?) ========
  :checksum: C1
  :size: Z1
  :obsoletes: A1

New System Metadata for A1   [if system metadata for back versions is maintained]:

  :identifier: A1
  :seriesId: S1
  :dateUploaded: t1
  :checksum: C1
  :size: Z1
  :obsoletedBy: A2


Entity Updates
===============
An update to an entity constitutes the creation of a new version (object) related
to the previous version it replaces.  If the new version overwrites the previous
version without preserving the old object, the previous version is de facto
orphaned, and DataONE consumers will need to rely on any replicas created within
the DatAONE network.
  
Previous System Metadata for A1:

  :identifier: A1
  :seriesId: S1
  :dateUploaded: t1
  :checksum: C1
  :size: Z1
  :dateSystemMetadataModified: t2
  
  
New System Metadata for A2:

  :identifier: A2
  :seriesId: S2
  :dateUploaded: t3 (where t3 > t1)
  :checksum: C2
  :size: Z2
  :obsoletes: A1  
  :dateSystemMetadataModified: t4

New System Metadata for A1   [if system metdata for back versions is maintained]:

  :identifier: A1
  :seriesId: S1
  :dateUploaded: t1
  :checksum: C1
  :size: Z1
  :obsoletedBy: A2
  :dateSystemMetadataModified: t4


Entity Archiving
================
If the repository supports archiving, it can be reflected in the entity's system 
metadata, by setting the archived property to true.  The system metadata MUST
remain available.

System Metadata:

  :archived: true
  :dateSystemMetadataModified: current date-time


This will be processed by DataONE as a system metadata update.  Archiving an object
in DataONE removes it from the DataONE solr search index, but leaves it available
for retrieval through READ APIs.  The main use case is to limit discovery of
outdated content, without making the object unavailable to users already relying
on the content for ongoing analyses, or retrieval by identifier found in a publication.


Entity Unarchiving
==================
Once the archived property is set to true, it cannot be set to false or null. <========  Question: why? =========

Therefore, to unarchive an entity, you must create a duplicate version with the
same seriesId.

System Metadata:

  :identifier: a new version identifier
  :seriesId: same seriesId
  :dateUploaded: the version creation date
  :dateSystemMetadataModified: the version creation date.


Entity Deletion
===============
Simple removal of an entity is mapped to a DataONE archive action, that is, setting 
the archived flag to true ( see entity archiving ).  Member Nodes MUST at a 
minimum keep the system metadata of the latest verison available for retrieval.



Entity Deletion for Legal Reasons
---------------------------------
DataONE supports deletion of content (removal of replicas across all Member and
Coordinating Nodes) for legal take-downs of inappropriate content or over-replication.

All of these deletions are coordinated centrally by DataONE, and all Member Nodes
should contact DataONE administrators to plan such events.


Entity Reversion
=================
When an entity reverts back to the previous version, DataONE provides no mechanism
to rearrange versions, and Member Node administrators SHOULD NOT try to retro-fix
system metadata properties to otherwise fool resolution services.  Instead a new
version identifier should be generated for the version along with a new dateUploaded
later than the widthdrawn version. 

This will result in possible duplication of content in the DataONE system, but
this is an acceptable outcome.

System Metadata for Av1:

  :identifier: A1
  :seriesId: S1
  :dateUploaded: t1
  :checksum: C1
  :size: Z1

System Metadata for Av2:

  :identifier: A2
  :seriesId: S1
  :dateUploaded: t2
  :obsoletes: A1
  :checksum: C2
  :size: Z2

System Metadata for Av3:

  :identifier: A3
  :seriesId: S1
  :dateUploaded: t3
  :obsoletes: A2
  :checksum: C1
  :size: Z1


**Question**   What is the impact of duplicate objects on MN reporting?  







Cruft
=====

Due to the distributed nature of responsibility, and infrastructure, we require
an explicit hand off of this role through an update to the system metadata.
 
(immutability allows asynchrony and eventual consistency)

reflecting mutable entities as immutable objects

  - read
  - resolve
  - create
  - update
  - delete
  - archive
  - collection management / inventory
  
 
DataONE manages the synchronization and replication of persisted, immutable versions
of entities it calls objects.  Repositories that can identify and expose specific 
versions of their stored content as objects through DataONE Member Node APIs can
with modest effort participate as Member Nodes of DataONE - even those whose 
entities are mutable.

The purpose of this article is to provide a concise guide for owners of repositories of 
mutable content who wish to implement the Member Node API in their application server.  
Before embarking on development iterations, hopeful developers should carefully 
consider the cost-benefit of this approach versus other deployment options using 
tested DataONE Member Node packages (described elsewhere). 

By implementing the Member Node APIs, developers will need to handle more complexity, including:

#. multi-reader locking
#. implementing transactions so changes to entities are always accompanied by change
   to the system metadata.
#. implementing any needed change controls to satisfy object immutability requirement.
#. minimizing post-processing steps in the retrieval methods.  Even standard libraries
   change behavior over time, or with reconfiguration.  (For example, XML formatters)
#. maintaining a storage space for DataONE SystemMetadata
#. maintaining a storage space for Resource Maps.




For systems not built for it, byte-level consistency for retrievals is a difficult
thing to add after the fact.  Whether it be the need to assemble the object or 
apply post-processing upon retrieval, ...
