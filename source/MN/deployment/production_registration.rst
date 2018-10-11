Production Registration
=======================

:Document Status:
  ======== ==================================================================
  Status   Comment
  ======== ==================================================================
  DRAFT    (MBJ) Initial draft
  ======== ==================================================================

Production registration involves deploying and registering the production Member Node that is to be operated as part of DataONE.  Registering the production node is the final technical step required for DataONE to approve the node and for it to enter into operational status.

To register the node, you need to have a DataONE issued client certificate which identifies the Member Node to the Coordinating Node, and then you use that certificate to register the node with DataONE.  Specifically:

    a. Obtain a production certificate for the Member Node

       - Request from 'support@dataone.org'

    #. Install the production certificate on the production implementation of the node
    #. Call the CN.register() service to register the node
    #. Send an email to 'support@dataone.org' to request node approval and transition into operational status
