Glossary
========

.. glossary::

  CA certificate
    A certificate that belongs to a :term:`CA` and serves as the root
    certificate in a term:`chain of trust`.

  CA
  Certificate Authority

    A certificate authority is an entity that issues digital :term:`certificate`
    s. The digital certificate certifies the ownership of a public key by the
    named subject of the certificate. This allows others (relying parties) to
    rely upon signatures or assertions made by the private key that corresponds
    to the public key that is certified. In this model of trust relationships, a
    CA is a trusted third party that is trusted by both the subject (owner) of
    the certificate and the party relying upon the certificate. CAs are
    characteristic of many public key infrastructure (PKI) schemes.

    http://en.wikipedia.org/wiki/Certificate_authority

  CA signing key
    The private key which the :term:`CA` uses for signing :term:`CSR`\ s.

  Certificate
    A public key certificate (also known as a digital certificate or identity
    certificate) is an electronic document which uses a digital signature to bind
    a public key with an identity -- information such as the name of a person or an
    organization, their address, and so forth. The certificate can be used to
    verify that a public key belongs to an individual.

    http://en.wikipedia.org/wiki/Public_key_certificate

  Chain of trust
    The Chain of Trust of a Certificate Chain is an ordered list of
    certificates, containing an end-user subscriber certificate and intermediate
    certificates (that represents the Intermediate CA), that enables the
    receiver to verify that the sender and all intermediates certificates are
    trustworthy.

    http://en.wikipedia.org/wiki/Chain_of_trust

  CILogon
    The CILogon project facilitates secure access to CyberInfrastructure (CI).

    http://www.cilogon.org/

  client
    An application that accesses the DataONE infrastructure on behalf of
    a user.

  Client Library
    Part of the DataONE :term:`Investigator Toolkit (ITK)`. Provides
    programmatic access to the DataONE infrastructure and may be used to form
    the basis of larger applications or to extend existing applications
    to utilize the services of DataONE.

    Available for Java and Python.

    `Java Client Library documentation <http://mule1.dataone.org/OperationDocs/DataONE-Java-Client-Library-HowTo.html>`_

    `Java Client Library source <https://repository.dataone.org/software/cicore/trunk/d1_libclient_java>`_

    `Python Client Library documentation <https://repository.dataone.org/software/cicore/trunk/d1_libclient_python/doc/build/html/index.html>`_

    `Python Client Library source <https://repository.dataone.org/software/cicore/trunk/d1_libclient_python>`_

  Client side authentication
    :term:`SSL` Client side authentication is part of the :term:`SSL handshake`,
    where the client proves its identity to the web server by providing a
    :term:`certificate` to the server. The certificate provided by the client
    must be signed by a :term:`CA` that is trusted by the server. Client Side
    Authentication is not a required part of the handshake. The server can be
    set up to not allow Client side authentication, to require it or to let it
    be optional.

  Client side certificate
    :term:`Certificate` that is provided by the client during :term:`client side
    authentication`.

  cn
  CN
  Coordinating Node
    A server that implements the DataONE Coordinating Node API.

  Common Library
    Part of the DataONE :term:`Investigator Toolkit (ITK)`. Provides
    functionality commonly needed by projects that interact with the
    :term:`DataONE` infrastructure, such as serialization and deserialization
    of the DataONE types to and from types native to the programming language.

    It is a dependency of DataONE :term:`Client Library`.

    Available for Java and Python.

    :TODO: We need to point to releases.dataone.org for the Common Libraries.
      For now, see https://repository.dataone.org/software/cicore/trunk/

  Coordinating Node API
    The Application Programming Interfaces that Coordinating Nodes implement
    to facilite interactions with :term:`MN` and DataONE clients.

    http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html

  CSR
    Certificate Signing Request

    A message sent from an applicant to a :term:`CA` in order to apply for a
    :term:`certificate`.

    http://en.wikipedia.org/wiki/Certificate_signing_request

  DataONE
    Data Observation Network for Earth

    https://dataone.org

  Data Packaging
    Data, in the context of DataONE, is a discrete unit of digital content that
    is expected to represent information obtained from some experiment or
    scientific study.

    http://mule1.dataone.org/ArchitectureDocs-current/design/DataPackage.html

  DN
    Distinguished Name

  environment
  Environment
    The collection of Coordinating Nodes, Member Nodes, and applications (e.g. 
    search interface) that work together as a federation. There is a single 
    *Production Environment* and several test environments.

  environment dns
  Environment DNS
    The DNS entry that all systems interacting with CNs in and Environment 
    should use. During maintenance, the Environment DNS entry will be adjusted 
    to point to another CN in the same Environment, thus helping to ensure 
    ongoing availability of services while other CNs are offline. For example, 
    the DataONE Production Environment has three CNS, ``cn-ucsb-1.dataone.org``, 
    ``cn-unm-1.dataone.org``, and ``cn-orc-1.dataone.org``. The Environment DNS 
    is ``cn.dataone.org`` and points to one of the three CNs. The Environment 
    DNS entry has a relatively short TTL, and its associated IPAddress should 
    not be cached for more than a few seconds.

  GMN
    DataONE Generic Member Node

    GMN is a complete implementation of a :term:`MN`, written in Python. It
    provides an implementation of all MN APIs and can be used by organizations
    to expose their Science Data to DataONE if they do not wish to create their
    own, native MN.

    GMN can be used as a standalone MN or it can be used for exposing
    data that is already available on the web, to DataONE. When used in this
    way, GMN provides a DataONE compatible interface to existing data and does
    not store the data.

    GMN can also be used as a workbone or reference for a 3rd party
    MN implementation. If an organization wishes to donate storage space
    to DataONE, GMN can be set up as a :term:`replication target`.

  Identity Provider
    A service that authenticates users and issues security tokens.

    In the context of DataONE, an Identity Provider is a 3rd party institution
    where the user has an account. :term:`CILogon` acts as an intermediary
    between DataONE and the institution by creating :term:`X.509` certificates
    based on identity assertions made by the institutions.

  Investigator Toolkit (ITK)
    The Investigator Toolkit provides a suite of software tools that are useful
    for the various audiences that DataONE serves. The tools fall in a number of
    categories, which are further developed here, with examples of potential
    applications that would fit into each category.

    http://mule1.dataone.org/ArchitectureDocs-current/design/itk-overview.html

  Java
    A statically typed programming language.

    http://java.com

  LOA
    Levels of Assurance

    CILogon operates three Certification Authorities (CAs) with consistent
    operational and technical security controls. The CAs differ only in their
    procedures for subscriber authentication, identity validation, and naming.
    These differing procedures result in different Levels of Assurance (LOA)
    regarding the strength of the identity contained in the certificate. For
    this reason, relying parties may decide to accept certificates from only a
    subset of the CILogon CAs.

    http://ca.cilogon.org/loa

  Member Node API
    The Application Programming Interfaces that a repository must implement in
    order to join DataONE as a Member Node.

    http://mule1.dataone.org/ArchitectureDocs-current/apis/MN_APIs.html

  Metacat
    Metacat is a repository for data and metadata (documentation about data)
    that helps scientists find, understand and effectively use data sets they
    manage or that have been created by others. Thousands of data sets are
    currently documented in a standardized way and stored in Metacat systems,
    providing the scientific community with a broad range of Science Data
    thatâ€“because the data are well and consistently describedâ€“can be easily
    searched, compared, merged, or used in other ways.

    Metacat is implemented in Java.

    http://knb.ecoinformatics.org/knb/docs/

  MN
  Member Node
    A server that implements the DataONE Member Node API.

  MNCore API
    A set of :term:`MN` APIs that implement core functionality.

    http://mule1.dataone.org/ArchitectureDocs-current/apis/MN_APIs.html#module-MNCore

  MNRead API
    A set of :term:`MN` APIs that implement Read functionality.

    http://mule1.dataone.org/ArchitectureDocs-current/apis/MN_APIs.html#module-MNRead

  OAI-ORE
    Open Archives Initiative's Object Resource and Exchange

    http://www.openarchives.org/ore/

  OpenSSL
    Toolkit implementing the :term:`SSL` v2/v3 and :term:`TLS` v1 protocols as
    well as a full-strength general purpose cryptography library.

  primary cn
  Primary CN
  Primary Coordinating Node
    The CN on which the ``d1-processing`` daemon is running. The Primary CN 
    must always have the :term:`Environment DNS` pointing to it.
  
  Python
    A dynamic programming language.

    http://www.python.org

  RDF
    Resource Description Framework

    The Resource Description Framework (RDF) [1] is a family of World Wide Web
    Consortium (W3C) specifications [2] originally designed as a metadata data
    model. It has come to be used as a general method for conceptual description
    or modeling of information that is implemented in web resources, using a
    variety of syntax notations and data serialization formats.

    [1] http://www.w3.org/RDF/
    [2] http://en.wikipedia.org/wiki/Resource_Description_Framework

  Read Only
  read-only mode
     The state of an environment when updates to content throught the DataONE 
     service interfaces is disabled. Services including ``resolve``, ``get``,
     ``getSystemMetadata``, ``getLogRecords``, and ``search`` continue to 
     function enabling user access to the content without disruption.

  Replication target
    A :term:`MN` that accepts replicas (copies) of Science Data from other MNs
    and thereby helps ensuring that Science Data remains available.

  Resource Map
    An object (file) that describes one or more aggregations of Web resources.
    In the context of DataONE, the web resources are DataONE objects such as
    :term:`Science Data` and :term:`Science Metadata`.

    http://www.openarchives.org/ore/1.0/toc

  REST
    Representational State Transfer

    A style of software architecture for distributed hypermedia systems such as
    the World Wide Web.

    http://en.wikipedia.org/wiki/Representational_State_Transfer

  SciData
  Science Data
    An object (file) that contains scienctific observational data.

  SciMeta
  Science Metadata
    An object (file) that contains information about a :term:`Science Data`
    object.

  subject
    In DataONE, a subject is a unique identity, represented as a string. A user
    or Node that wishes to act as a given subject in the DataONE infrastructure
    must hold an :term:`X.509` certificate for that subject.

    DataONE defines a serialization method in which a subject is derived from 
    the :term:`DN` in a X.509 certificate.

  Self signed certificate
    A :term:`certificate` that is signed by its own creator. A self signed
    certificate is not a part of a :term:`chain of trust` and so, it is not
    possible to validate the information stored in the certificate. Because of
    this, self signed certificates are useful mostly for testing in an
    implicitly trusted environment.

    http://en.wikipedia.org/wiki/Self-signed_certificate

  Server key
    The private key that Apache will use for proving that it is the owner
    of the :term:`certificate` that it provides to the client during the
    SSL handshake.

  Server Side Authentication
    :term:`SSL` Server Side Authentication is part of the :term:`SSL handshake`,
    where the server proves its identity to the client by providing a
    :term:`certificate` to the client. The certificate provided by the server
    must be signed by a :term:`CA` that is trusted by the client. Server Side
    Authentication is a required part of the handshake.

  Server side certificate
    :term:`Certificate` that is provided by the server during :term:`server side
    authentication`.

  SSL
    Secure Sockets Layer

    A protocol for transmitting private information via the Internet. SSL uses a
    cryptographic system that uses two keys to encrypt data âˆ’ a public key known
    to everyone and a private or secret key known only to the recipient of the
    message.

  SSL handshake
    The initial negotiation between two machines that communicate over SSL.

    http://developer.connectopensource.org/display/CONNECTWIKI/SSL+Handshake

    http://developer.connectopensource.org/download/attachments/34210577/Ssl_handshake_with_two_way_authentication_with_certificates.png

  SysMeta
  System Metadata
    An object (file) that contains system level information about a
    :term:`Science Data`\ -, :term:`Science Metadata`\ - or other DataONE
    object.

    `Overview of System Metadata <http://mule1.dataone.org/ArchitectureDocs-current/design/SystemMetadata.html>`

    `Description of the System Metadata type <http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.SystemMetadata>`

  Tier
    A tier designates a certain level of functionality exposed by a :term:`MN`.

    :doc:`DataONE Member Node Tiers <MN/deployment/select-tier>`.

  TLS
    Transport Layer Security

    Successor of :term:`SSL`.

  X.509
    An ITU-T standard for a public key infrastructure (PKI) for single sign-on
    (SSO) and Privilege Management Infrastructure (PMI). X.509 specifies, amongst
    other things, standard formats for public key certificates, certificate
    revocation lists, attribute certificates, and a certification path validation
    algorithm.

    http://en.wikipedia.org/wiki/X509
