Deployment to Production Environment
====================================

After a Member Node instance is successfully passing tests it can be deployed to the production environment. The steps for deployment are:

1. Add the MN logo to the Github repository

2. Add the MN to the list of upcoming Member Nodes

3. Verify that the MN instance is populated with production content, not test content

4. Prepare announcement for the MN release

5. Obtain a client certificate for the MN. This certificate must be signed by the Production Certificate Authority.

6. Register the MN in the production environment

7. Update the custom "CN\_" node registration properties

8. Approve MN

9. Content starts synchronizing

10. Verify content has synchronized and appears in the search UI

11. Announce the new MN


1. Add MN Logo to GitHub
------------------------

See the `Member Node Info repository <https://github.com/DataONEorg/member-node-info>`_ on GitHub.


2. Add to Upcoming
------------------

When a MN is getting close to deployment, it may be added the "upcoming" MN list that is shown on the DataONE Member Nodes dashboard_.


.. _dashboard: https://www.dataone.org/current-member-nodes


3. Verify MN Content
--------------------

It is important that no test content is present on the MN when it is being added to the production environment. Accidental content can be removed, but it is a process that should be avoided where possible.

Work with the MN operator to ensure no test content remains (if repurposing a test instance) and that the node is appropriately populated.



4. Prepare Announcement
-----------------------

The public announcement of a new MN requires a bit of back and forwards between DataONE and the MN, so it is best t start this process early to ensure the announcement document is ready.


5. Obtain Client Certificate
----------------------------

The client certificate is needed for the MN to register with the CN, and for any other actions that require the node to authenticate.

See the CA project in subversion at: https://repository.dataone.org/software/tools/trunk/ca/


6. Register MN
--------------

Registering the MN will record the presence of the MN in the Production environment node registry. The CNs will not interact with the MN until the registration is approved.


7. Add ``CN_`` Properties
-------------------------

After the node is registered

8. Approve MN
-------------


9. Content Synchronization
--------------------------


10. Sync and Search Verification
-------------------------------


11. Announcement
----------------