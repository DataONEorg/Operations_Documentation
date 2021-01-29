Development iteration
=====================

:Document Status:

  ======== ==================================================================
  Status   Comment
  ======== ==================================================================
  DRAFT    (CSJ) Initial draft
  DRAFT    (Dahl)
  ======== ==================================================================


To enable a repository to communicate using the :term:`DataONE Member Node API`\ s, most groups take an iterative approach, implementing the lowest level APIs first, and working up through the :term:`Tier`\ s. Implementing the DataONE APIs also involves managing identifiers, System Metadata, content versioning, and data packaging. We touch on these issues here.

.. Note:: The :term:`DataONE Common <DataONE Common Library>` and :term:`DataONE Client <DataONE Client Library>` libraries provide serialization and deserialization of the DataONE types and language-specific wrappers for the DataONE APIs.


Implementing the Tier 1 Member Node API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MN developers will need to first implement the :term:`MNCore API`, which provides utility methods for use by :term:`CN`\ s, other :term:`MN`\ s and :term:`ITK` components. The ``ping()`` method provides a lightweight 'are you alive' operation, while the ``getCapabilities()`` provides the Node document so software clients can discover which services are provided by the MN. The CNs also use the ``getLogRecords()`` method to aggregate usage statistics of the Node and Object levels so that scientists and MN operators have access to usage for objects that they are authorized to view.

The bulk of the work within the system is provided by :term:`MNRead API` methods. The CNs use the ``listObjects()`` method to harvest (or synchronize) Science Metadata from the Member Nodes on a scheduled basis. They also call ``get()``, ``getSystemMetadata()``, and ``getChecksum()`` to verify and register objects in the system. They will occasionally call ``synchronizationFailed()`` when there is an error, and MN operators should use these events to log these exceptions for ``getLogRecords()``, and should inform the MN operator of the problems in a way they see fit (email, syslog, monitoring software, etc). Lastly, the ``getReplica()`` call is distinguished from the ``get()`` call in that it is only used between Member Nodes that are participating in the DataONE replication system, and that these events are logged differently to not inflate download statistics for objects. Implementing the MNRead API requires identifier management, System Metadata management, versioning, and packaging, described below.



Handling identifiers
~~~~~~~~~~~~~~~~~~~~

To support as many repository systems as possible, DataONE puts few constraints on identifier strings that are used to identify objects. See the details for the `Identifier Type`_. This flexibility requires that identifiers with special characters that would affect :term:`REST` API calls, XML document structure, etc. will need to be escaped appropriately in serialized form. See the documentation on `Identifiers`_ for the details. MN operators will need to ensure that identifiers are immutable, in that there is a one to one relationship between an identifier and an object (byte for byte). This allows the DataONE system to use the checksum and byte count declared in System Metadata documents to verify and track objects correctly. Calling ``get()`` on an identifier must always return the same byte stream. See the documentation on `mutability of content`_ for more details.

.. _Identifiers: http://mule1.dataone.org/ArchitectureDocs-current/design/PIDs.html

.. _`Identifier Type`:
     http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Identifier

.. _`mutability of content`:
     http://mule1.dataone.org/ArchitectureDocs-current/design/ContentMutability.html


System Metadata
~~~~~~~~~~~~~~~

Each object (:term:`Science Data`, :term:`Science Metadata`, or :term:`Resource Map`\ s) that is exposed to the DataONE system via ``MNRead.listObjects()`` must have an accompanying :term:`System Metadata` document. These documents provide basic information for access, synchronization, replication, and versioning of content. MN operators will need to either store or generate System Metadata.

One notable component of System Metadata is the formatId_ field. To support as many repository systems and object types as possible, DataONE assigns format information to objects according to an extensible list of object formats. The Object Format List holds a list of types akin to MIME types and file formats. The `definitive list`_ is found on the production CNs.

When a new MN, holding a new type of object, joins DataONE, the new Object Formats should be added to the Object Format List before they are used in the System Metadata formatID field. DataONE has been involved in the `Unified Digital Format Registry`_ project to establish a comprehensive registry of formats, and development is ongoing. DataONE currently recognizes over `135 Object Formats`_. There are three main steps to registering a new format with DataONE:

1. Add the schema for the new format to `the Metacat repository`_. Instructions for how to complete this step are available in the `Metacat documentation`_.

2. Add the new format identifier to the `DataONE Object Formats repository`_. See the `Contributing section`_ of the repository's README for further information on how to add the new format.

3. If needed, create an Apache rewrite rule to redirect from `purl.dataone.org`_ to the object schema. For instructions, see the README in the `DataONE PURL repository`_.

When MN objects are synchronized, objects that are tagged in the Object Format List as holding metadata (i.e. Science Metadata), will be parsed and indexed on the CN for search and discovery services. The automatic parsing and indexing is not supported for all types of objects that contain Science Metadata. For objects that are not currently supported, MN developers should coordinate with the DataONE developers to provide mappings between metadata fields and fields in DataONE's search index. See the `Content Discovery`_ documentation for details.

.. _`Content Discovery`:
     http://mule1.dataone.org/ArchitectureDocs-current/design/SearchMetadata.html

.. _`Unified Digital Format Registry`: http://udfr.org

.. _`definitive list`: https://cn.dataone.org/cn/v1/formats

.. _formatId:
     http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.ObjectFormatIdentifier

.. _`135 registered object formats`:
     https://cn.dataone.org/cn/v2/formats

.. _`the Metacat repository`:
     https://github.com/NCEAS/Metacat

.. _`Metacat documentation`:
     https://github.com/NCEAS/metacat/issues/1473

.. _`DataONE Object Formats repository`:
     https://github.com/DataONEorg/object-formats

.. _`Contributing section`:
     https://github.com/DataONEorg/object-formats#contributing

.. _`purl.dataone.org`:
     https://purl.dataone.org

.. _`DataONE PURL repository`:
     https://github.com/DataONEorg/dataone_purl

Content versioning
~~~~~~~~~~~~~~~~~~

Objects in DataONE are immutable. When a scientist or MN operator wants to update an object (Science Data, Science Metadata, or Resource Map), the process involves the following sequence:

1) Minting a new identifier

#) Creating a new System Metadata document for the new version of the object, and setting the 'obsoletes' field to the previous object identifier

#) Updating the previous object's System Metadata, setting the 'obsoletedBy' field to the new object's identifier, and setting the 'archived' field to 'true'.

#) Updating the Member Node data store to include the new object (and the old one). For Tier 1 and 2 MNs, this will happen outside of the DataONE API. For Tier 3 and Tier 4 MNs, it can be done through the MNStorage.update() call.

Since one of the main goals of DataONE is to provide a preservation network with citable data to enable reproducible science, this sequence is critical to the system's success. There are times when a Member Node won't be able to store earlier versions of objects indefinitely, in which case MNs should set a replication policy in their object's System Metadata to 'true' so that replicas can be made and the system will act as a persistent store of the versioned objects. However, Member Nodes have suggested that DataONE support mutable objects, and possible ways to support this without impeding the preservation goals of the federation are currently under investigation. DataONE is open for input on this. If you are facing issues with versioning, please contact support@dataone.org.


Data packaging
~~~~~~~~~~~~~~

Scientists often work with separate objects (files) containing data and metadata, and want to access them as a collection. However, communities use different packaging technologies that are often specific to their data types. To support collections across a federated network, DataONE chose to represent data packages using the :term:`OAI-ORE` specification. Also known as :term:`Resource Map`\ s, these documents use :term:`RDF` to describe relationships among objects (resources). DataONE has chosen a limited vocabulary to represent associations between objects. Currently, the associations are:

* describes / describedBy
* aggregates / isAggregatedBy
* documents / isDocumentedBy

For instance, a Resource Map *describes* an aggregation, and the aggregation *aggregates* a Science Metadata document and a Science Data object. In turn, the Science Metadata document *documents* a Science Data object. These relationships are captured in the Resource Map as 'triple statements', and provide a graph of associations. Resource Maps may also be more complex, where one Science Metadata document *documents* many Science Data objects. Some repositories may find the need to create hierarchical collections, where one Resource Map *aggregates* another.

Member Node operators will need to store or generate Resource Maps that will get harvested during scheduled synchronization. The CNs will parse the maps and index these data/metadata relationships, to be used in content discovery. Note that Resource Maps will also need associated System Metadata documents. during this phase of development, MN operators can make use of the :term:`DataONE Common <DataONE Common Library>` and :term:`DataONE Client <DataONE Client Library>` libraries for building Resource Maps. Details about `data packaging`_ can be found in the architecture documentation.
