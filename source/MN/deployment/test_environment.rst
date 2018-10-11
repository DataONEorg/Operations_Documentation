.. _test-environment:

Establish Testing Environment
=============================

:Document Status:
  ======== ==================================================================
  Status   Comment
  ======== ==================================================================
  DRAFT    (MBJ) Initial draft
  ======== ==================================================================

A testing environment consists of a test Member Node (MN) installation on either a physical or virtual machine. This MN software can optionally be registered in a DataONE testing environment in order to emulate the real-world production scenario.  **In the early phases of development, registering a Member Node in a dataONE environment isn't required**.  Rather, the MN operator can use the `Member Node Check`_ service to test their implementation.  This testing service will make calls to all of the expected API endpoints on the MN for each Tier, and will report on success, failures, or warnings.  This service can check against multiple versions of the API, so operators should choose tests for the version they are targeting (likely the most recent).

DataONE provides `multiple deployment environments`_ that emulate the production environment.  An 'environment', per se, is a set of Coordinating Nodes (CNs) communicating with each other, and a set of Member Nodes (MNs) that are registered with those Coordinating Nodes.  They communicate with the CNs, and potentially with other MNs if replication is enabled.

Once a strategy has been chosen for a technical implementation, Member Node operators should establish a test server environment (either physical or virtual machines), preferably separate from the server or servers to be used in the production environment.  For those choosing existing software stacks, this means installing the operating system, all of the prerequisite software, and then installing the DataONE-enabled repository software itself.  Our reference implementations have been built using Ubuntu Linux 10.04 LTS, and we will be migrating to Ubuntu 12.04 LTS. With a test server established, operators can make use of one of three development environments used for registering and testing the Member Node functionality.  These are:

1) The `Dev environment`_: Contains up to 3 Coordinating Nodes and multiple internal testing Mebmer Node deployments.  This is the most unstable of all of the environments, and is good for early Member Node development work.

2) The `Sandbox environment`_: Contains up to 3 Coordinating Nodes and multiple Member Node deployments.  It is used for testing new features in a more stable environment than Dev.

3) The `Staging environment`_: Contains up to 3 Coordinating Nodes and a multiple Member Node deployments from partner institutions. The deployed software is identical to the production environment, but still contains test content.

There are a couple prerequisites to register your test Member Node with one of these environments:

1) **Sign into the environment as the Member Node operator**.  Only 'verified' accounts are able to register nodes with the Coordinating Nodes, and the first step is to sign in and register your name and email.  This can be done in each environment (including production), by visiting the /portal endpoint for the environment.  For instance, in the staging environment, visit https://cn-stage.test.dataone.org/portal and begin the login form.  This will redirect you to the CILogon service, which prompts you to authenticate against your 'Identity Provider'.  If your institution isn't listed, you can use a Google or ProtectNetwork account.  Once authenticated, you will be returned to the DataONE portal to fill in your name and email.  Once registered, you will see the Distinguished Name assigned to you from the CILogon service.  This DN is used in the contactSubject field of your Member Node document used to register your Node_. At this point you can contact the DataONE developer you're working with, or support@dataone.org, to have the `verified`_ flag set on your account.

2) **Obtain DataONE client SSL certificates**. Cient-side SSL certificates are used to identify users and nodes.  Nodes are issued a long-lasting X.509 certificate with the Node.subject embedded in it.  Send an email to your DataONE developer contact, or to support@dataone.org, to request your certificates. Tier 1 Member Nodes will only need the certificate when calling the CN during MNRegister calls, and other select calls like CNReplication.isNodeAuthorized(). Tier 2 and higher nodes will use this certificate identity during all of the service calls.

3) **Construct a Node document to be registered**. To register your node in a test environment, you POST an XML Node_ document to the /node REST endpoint.  The field values in this document affect both programmatic Node communication, as well as graphical interfaces used by scientists to understand what your Member Node represents.  Some details are:

* *identifier*: The node identifier matches the pattern ``urn:node:XXXXX`` where ``XXXXX`` is a short string representing your repository.  Coordinate with your DataONE developer contact on establishing your test identifier and your production identifier.  As an example, the Dryad Data Repository uses a test identifier of ``urn:node:mnTestDRYAD``, and a production identifier of ``urn:node:DRYAD``.

* *name*: The node name is visible in graphical interfaces, so should be short, but should represent the repository.  A good example is the ``USGS Core Sciences Clearinghouse``. It corresponds with an identifier of ``urn:node:USGSCSAS``, and a description of ``US Geological Survey Core Science Metadata Clearinghouse archives metadata records describing datasets largely focused on wildlife biology, ecology, environmental science, temperature, geospatial data layers documenting land cover and stewardship (ownership and management), and more.`` 

* *description*: The node description gives more details than the name. See above.

* *subject*: The node subject is the Distinguished Name that represents the Node.  This subject must match the Subject listed in the DataONE client SSL certificate used for authentication and authorization of all Node-level operations.  This DN follows the pattern 'CN=urn:node:XXXXX,DC=dataone,DC=org', where the common name portion of the DN matches the identifier of the node.

* *state*: Member Nodes should keep their registered Node document up to date in the production environment.  For example, if the Node is running correctly, the state is 'up', but when it is down for maintenance or an unscheduled outage, the state should be set to 'down'. See the documentation on the `CNregister.updateNodeCapabilities()`_ API call for details.

There are other required and optional fields in the Node document, but the list above mentions fields that are particularly notable.

4) **Register the Node**: Finally, POST the XML Node document to the /node REST endpoint for the given environment.  See the details in the `CNRegister.register()`_ API call. You must send your DataONE client SSL certificate with the request for authentication.

.. _CNRegister.register(): http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.register
.. _CNregister.updateNodeCapabilities(): http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.updateNodeCapabilities
.. _verified: http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Person.verified
.. _Node: http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Node
.. _Member Node Check: http://mncheck.test.dataone.org:8080
.. _multiple deployment environments: ../environments.html
.. _Dev environment: https://cn-dev.test.dataone.org/cn
.. _Sandbox environment: https://cn-sandbox.test.dataone.org/cn
.. _Staging environment: https://cn-stage.test.dataone.org/cn

