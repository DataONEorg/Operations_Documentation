Node Registration
==================

.. contents::

A Member Node (MN) becomes part of DataONE through Node Registration.  Registering 
the MN allows the Coordinating Nodes (CNs) to synchronize content, index metadata 
documents and resource maps, and replicate its content to other MNs.  Before registering
the MN into the production DataONE environment, it is registered into the Staging
environment for testing. 

Follow the following steps for each environment you register your node to:

#. Register the DataONE identity of the administrative contact for the new MN.

#. Create a Node document that includes the administrative contact.

#. Obtain a client certificate from DataONE for the MN.

#. Submit the Node document to DataONE using the client certificate.

#. Notify your primary DataONE contact of the registration request 

DataONE then evaluates the submission. Upon approval, the registration is complete, 
and the MN is part of the environment in which it was registered.


.. _create_dataone_identity:

Register the Administrative Contact identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step must be performed by the person who will be the contact for the new
MN. The contact person is often also the administrator for the MN.

Each DataONE environment has a web-based Identity Manager where DataONE identities 
are created and maintained.  To create a DataONE identity, you will use the 
Identity Manager to authenticate with a :term:`CILogon`-recognized identity, and
then attach your name and contact email.  At this point, DataONE will validate 
this information manually.  

To register the administrative contact's DataONE identity in the target environment,
perform the following steps:


#. Navigate to the Identity Manager of the target environment:

   =========== ==========================================
   Environment Identity Manager URL
   =========== ==========================================
   Production  https://cn.dataone.org/portal        
   Staging     https://cn-stage.test.dataone.org/portal
   Sandbox     https://cn-sandbox.test.dataone.org/portal
   Development https://cn-dev.test.dataone.org/portal
   =========== ==========================================

#. Follow the prompts to authenticate against your :term:`Identity Provider`. If 
   your institution is not listed, you can use a Google or ProtectNetwork account. 
  
#. Once authenticated and back at the DataONE portal, supply your name and email,
   and then click on the **Register** or **Update** button (only one will be present).
  
#. Record (copy to clipboard) the identity string shown in the 'Logged in as' field.
   This value is taken from the CILogon certificate issued when you authenticated
   against your chosen :term:`Identity Provider`, and is also a DataONE subject.
  
#. Paste this value into the contactSubject field of the Node document you plan to 
   submit in the next step.

#. DataONE requires that DataONE subjects that are to be used as contacts for
   MNs be verified. To verify the account, send an email to support@dataone.org (`launch`_). 
   In the email, include the identity string obtained in the step above and request 
   that the account be verified.  You do not need to wait for a reply to continue
   to the next step.

.. _`launch`: mailto:support@dataone.org?subject=User%20Account%20Verification%20Request&body=The%20subject%20string:%20<paste%20here>%0A%0Dtarget%20environment:%20<paste%20environment%20here>%0A%0D(please%20cc:%20your%20DataONE%20contact%20if%20in%20a%20test%20environment)

.. _create_node_document:

Create the Node document
~~~~~~~~~~~~~~~~~~~~~~~~

The Node document is a set of values that describe a MN or CN, its internet 
location, and the services it supports.

The values in the Node document are described in the `Node document section in the architecture documentation`_.

.. _Node document section in the architecture documentation: http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Node

What follows is an overview of only the required values in the Node document. Also see the `example node document`_.

.. _`example node document`: https://repository.dataone.org/documents/Projects/cicore/operations/source/member_node_deployment/example-files/node-example.xml

* **identifier**: A unique identifier for the node of the form \urn:node:NODEID 
  where NODEID is the node specific identifier. This value MUST NOT change for 
  future implementations of the same node, whereas the baseURL may change in the future.

  NODEID is typically a short name or acronym. As the identifier must be unique, 
  coordinate with your DataONE developer contact to establish your test and 
  production identifiers. The conventions for these are ``urn:node:mnTestNODEID`` 
  for the development, sandbox and staging environments and ``urn:node:NODEID`` 
  for the production environment. For reference, see the 
  `list of current DataONE Nodes <http://mule1.dataone.org/OperationDocs/membernodes.html>`_.

  E.g.: \urn:node:USGSCSAS (for production) and \urn:node:TestUSGSCSAS (for testing).


* **name**: A human readable name of the Node. This name can be used as a label 
  in many systems to represent the node, and thus should be short, but understandable.

  E.g.: USGS Core Sciences Clearinghouse


* **description**: Description of a Node, explaining the community it serves and 
  other relevant information about the node, such as what content is maintained 
  by this node and any other free style notes.

  E.g.: US Geological Survey Core Science Metadata Clearinghouse archives metadata 
  records describing datasets largely focused on wildlife biology, ecology, 
  environmental science, temperature, geospatial data layers documenting land 
  cover and stewardship (ownership and management), and more.


* **baseURL**: The base URL of the node, indicating the protocol, fully qualified 
  domain name, and path to the implementing service, excluding the version of the API.

  E.g.: \https://server.example.edu/app/d1/mn


* **contactSubject**: The appropriate person or group to contact regarding the 
  disposition, management, and status of this Member Node. The contactSubject is 
  an X.509 Distinguished Name for a person or group that can be used to look up 
  current contact details (e.g., name, email address) for the contact in the 
  DataONE Identity service. DataONE uses the contactSubject to provide notices 
  of interest to DataONE nodes, including information such as policy changes, 
  maintenance updates, node outage notifications, among other information useful 
  for administering a node. Each node that is registered with DataONE must 
  provide at least one contactSubject that has been verified with DataONE.

  The contactSubject must be the subject of the DataONE identity that was created 
  in the :ref:`previous step <create_dataone_identity>`.

  E.g.: 'CN=My Name,O=Google,C=US,DC=cilogon,DC=org'


* **replicate**: Set to true if the node is willing to be a :term:`replication target`, 
  otherwise false.

  This setting is ignored if the Tier of the node is lower than 4. It is intended 
  for temporarily disabling replication. For permanently disabling replication, 
  set TIER lower than 4 as well as this setting to False.

* **synchronize**: Set to true if the node should be synchronized by a CN, 
  otherwise false.

* **type**: The type of the node. For MNs, set to ``mn``.

* **state**: The state of the node.

  Set to 'up' when the Node is running correctly. Set to 'down' when it is down 
  for maintenance or an unscheduled outage. See the documentation on the 
  `CNRegister.updateNodeCapabilities()`_ API call for details.

.. _`CNRegister.updateNodeCapabilities()`: http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.updateNodeCapabilities

Obtain a client side certificate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DataONE will create and issue your node an :term:`X.509` certificate issued by 
the DataONE :term:`CA`.  This :term:`client side certificate` is to be used when 
the MN initiates REST API calls to CNs and other MNs.  Certificates issued by 
DataONE are long-lasting :term:`X.509` certificates linked to a specific MN via 
its :term:`DN`. 

Tier 1 MNs using http for MN API calls will likely only need this certificate 
when administering their node using the CNRegister API calls, which may
be done from any client machine.  Nevertheless, it is advisable to store this 
certificate on the Member Node server.



To obtain a client side certificate:

#. create an account on the `DataONE Registration page
   <https://docs.dataone.org/join_form>`_, 

#. notify DataONE by sending an email to support@dataone.org. In the email, 
   state that you are requesting a client side certificate for a new MN and 
   include the MN identifier, in the form ``urn:node:NODEID``, 
   :ref:`selected previously <create_node_document>`.

DataONE will create the certificate for you and notify you of its creation with
reply to your email. At this point:

#. follow the link provided in the email, and sign in using the account created
   or used in the first step, above.


You will initially receive a certificate that is valid for any and all of the test
environments. When the new MN is ready to go into production, you will receive a
production certificate.

.. WARNING:: Anyone who has the private key can act as your Node in the DataONE
  infrastructure. Keep the private key safe. If your private key becomes
  compromised, please inform DataONE so that the certificate can be revoked and
  a new one generated. 


Register the MN
~~~~~~~~~~~~~~~

The MN registration procedure is designed to be automatable in MN implementations 
and is automated in :term:`Metacat` and :term:`GMN`. For MN implementations that 
do not automate this step, DataONE also provides a `simple script`_ to perform
this step.  Registering the MN is done by calling the `CNRegister.register()`_ API. 
The call essentially submits the `previously created Node document <Create the Node document>`_ 
to DataONE in a HTTP POST request over a TLS/SSL connection that has been 
authenticated with the `previously obtained certificate <Obtain a client side certificate>`_.

.. _`simple script`: http://mule1.dataone.org/OperationDocs/member_node_deployment/node-registration-update-script.html
.. _`CNRegister.register()`: http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.register

After running the script or running an automated registration, the Member Node
should email support@dataone.org to notify of the registration request, and notify
their primary technical contact at DataONE.


DataONE evaluates the submission
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DataONE evaluates the submitted Node document and contacts the person listed as 
*contactSubject* in the Node document by email with the outcome of the approval 
process. After the node has been approved, the MN is part of the infrastructure 
environment in which it has been registered, and the CNs in that environment will 
start processing the information on the node.
