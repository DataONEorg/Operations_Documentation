Managing Display of Upcoming Nodes
==================================

Upcoming Member Nodes are optionally added to the `upcoming Member Nodes`_ list



Adding a MN to the Upcoming Node List
-------------------------------------

.. uml::
   :align: left

   skinparam monochrome true
  
    start
    if ((1) Agree MN is ready \nfor upcoming?) then (yes)
      if ((2) Custom properties in \nMNDeployment ticket?) then (yes)
        if ((3) MN graphics in \nGithub web folder?) then (yes)
          :Proceed;
        else (no)
          :Add graphics to GitHub \nfolder before proceeding;
          stop 
        endif
      else (no)
        :Gather custom property values \nand add to applicable redmine \nMNDeployment ticket.;
        stop
      endif
    else (no)
      :Get agreement\nbefore proceeding.;
      stop
    endif

    :(4) Add entry to upcoming.xml;

    :(5) Verify node listed as upcoming;
    stop

**Figure 1.** Procedure for listing a MN in the list of `upcoming Member Nodes <https://www.dataone.org/current-member-nodes>`_ without registering the node in the production environment. 

  1. There must be agreement within DataONE and by the MN that they can be listed as upcoming. 
  2. For the MN to display properly a number of custom properties must be set, and the values for these should be recorded in the corresponding MN Deployment ticket in readmine. 
  3. The logo for the MN must be ready for display and present in the 
     `web folder <https://github.com/DataONEorg/member-node-info/tree/master/production/graphics/web>`_ 
     on in the `member-node-info repository <https://github.com/DataONEorg/member-node-info>`_ on GitHub.
  4. Adding an ``node`` entry in the `upcoming.xml <https://github.com/DataONEorg/member-node-info/blob/master/production/upcoming/upcoming.xml>`_ document and committing the change to GitHub will trigger the listing of the node as upcoming in the dashboard.
  5. The node should appear in the dashboard within 15 minutes.


Registering an Upcoming Member Node
-----------------------------------

The process of registering a node will add it to the production node list reported by the Coordinating Nodes.

.. uml::
   :align: left

   skinparam monochrome true
  
    start
    :Register node;
    :Add custom properties to node entry;
    if (Is MN listed as upcoming?) then (yes)
      :Remove node entry from upcoming.xml;
    endif
    :Verify node appears in upcoming node list;
    stop

**Figure 2.** Procedure for listing a Member Node as upcoming when it is registered with the production Coordinating Nodes.




