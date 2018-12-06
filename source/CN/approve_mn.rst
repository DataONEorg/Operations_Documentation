Approving a Member Node
=======================

Approving a Member Node involves setting the ``d1NodeApproved`` property for the 
node entry in LDAP and triggering a refresh of the node list in ``d1-processing`` 
so that the new node is subsequently processed for synchronization, 
log-aggregation and replication.

The approval process is performed after the MN has registered in the environment.

To approve a MN:

1. ``ssh`` to a Coordinating Node in the environment.
2. run ``sudo /usr/local/bin/dataone-approve-node``
3. Answer the questions, e.g.::

    Choose the number of the Certificate to use
    0)  urn:node:cnStageUCSB1.pem
    1)  urn_node_cnStageUCSB1.pem
    0

    Pending Nodes to Approve
    0) urn:node:mnStageORC1 1) urn:node:mnStageLTER 2) urn:node:mnStageCDL  3) urn:node:USGSCSAS
    4) urn:node:ORNLDAAC  5) urn:node:mnTestTFRI  6) urn:node:mnTestUSANPN  7) urn:node:TestKUBI
    8) urn:node:EDACGSTORE  9) urn:node:mnTestDRYAD 10) urn:node:DRYAD  11) urn:node:mnTestGLEON
    12) urn:node:mnDemo11 13) urn:node:mnTestEDORA  14) urn:node:mnTestRGD  15) urn:node:mnTestIOE
    16) urn:node:mnTestNRDC 17) urn:node:mnTestNRDC1  18) urn:node:mnTestPPBIO  19) urn:node:mnTestUIC
    20) urn:node:mnTestFEMC 21) urn:node:IEDA_MGDL
    Type the number of the Node to verify and press enter (return):
    21

    Do you wish to approve urn:node:IEDA_MGDL (Y=yes,N=no,C=cancel)
    Y

    Node Approved in LDAP
    Hazelcast Node Topic published to. Approval Complete

  There may be an ERROR message complaining of "No certificate installed in expected location: /tmp/x509up_u0". This can be safely ignored.

  