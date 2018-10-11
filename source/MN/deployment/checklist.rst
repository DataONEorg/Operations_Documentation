Member Node Deployment Checklist
================================

Overview
~~~~~~~~

This document provides details about the process of becoming a DataONE member node.  For an overview of
the process, see `Member Node Deployment Process`_ on the main website.

.. _Member Node Deployment Process: http://www.dataone.org/member-node-deployment-process

The process of becoming a DataONE Member Node can be viewed as four phases: `Planning`_, `Developing`_, `Testing`_, and `Operating`_.  While we 
present these as a linear process, for clarity and planning, steps are often done in parallel and a given organization may be doing 
some tasks in a later phase while the bulk of effort is in an earlier phase.    

.. graphviz::

  digraph MNChecklistGraph {
    compound=true;
    ranksep=".5";
    dpi = 72;
    node [shape=box, color="#530026", fillcolor=white, fontname=Arial];
    edge [weight=5, penwidth=2, color="#145A72"];
    subgraph cluster_plan {
      fontsize = 20;
      label = "Planning";
      style=filled;
      color="#EFEFEF";
      edge [weight=5]
      "Determine feasibility" ->
      "Join DataONE" ->
      "Scope the implementation" ->
      "Plan the implementation";
    }

    subgraph cluster_develop {
      fontsize = 20;
      label = "Developing";
      style = filled;
      color = "#EFEFEF";
      edge [weight=10]
      "Develop MN software";
       subgraph cluster_formats {
        label = "";
        style=filled;
        color="#DEDEDE";
        edge [weight=5]
        "Register Formats";
      }
      decision[shape=diamond, style="rounded", label="Passing\nMN Tests?"];
      "Develop MN software":se -> decision;
      "Register Formats":s -> decision;
      edge [style="invis"];
      node [style="invis"];
      "Develop MN software":s -> "Register Formats";
      decision -> hidden_develop_spacer;
    }


    subgraph cluster_testing {
      fontsize = 20;
      label = "Testing";
      style=filled;
      color="#EFEFEF";
      edge [weight=10]
      "Do Staging Tests";
      "Register in\nProduction";
      accept [shape=diamond, style="rounded", label="Mutually\nAccept"];
      "Do Staging Tests" ->
      "Register in\nProduction" ->
      accept;
      edge [style="invis"];
      node [style="invis"];
      accept -> hidden_testing_spacer;
    }

    subgraph cluster_operate {
      fontsize = 20;
      label = "Operating";
      style=filled;
      color="#EFEFEF";
      edge [weight=10]
      announce [label = "Announce Deployment"];
      ops [label = "Maintain MN Operations"];
      participate [label = "Participate in MN forums"];
      edge [style="invis"];
      node [style="invis"];
      announce -> ops -> participate -> hidden_operating_spacer;
    }


    {
      rank = same;
      "Determine feasibility";
      "Develop MN software";
      "Do Staging Tests";
      announce;
    }

  
    "Plan the implementation":e -> "Develop MN software":w;

    decision:e -> "Do Staging Tests":w;

    accept:e -> announce:w;


  }


Planning
~~~~~~~~

Plan the new Member Node.

* **Determine feasibility**

  Member Node representatives review the :doc:`mn_documentation`, in particular the `DataONE Partnership Guidelines`_ and determine if a partnership with DataONE makes sense, and if the organization has the resources required for successfully implementing and operating a MN.  Member Nodes can ask DataONE for information or help via the `Contact Us`_ page on the `DataONE`_ website.

* **Join the DataONE federation**

  * Member Node representatives, with assistance from DataONE personnel, collate MN information (such as high-level descriptions of the data the MN will provide).

  * The MN creates a Proposal.  This includes completion of the `Member Node Description Document`_.  [we need a detailed process below this]

  * Submits MN Proposal to DataONE for review.  See :doc:`mn_approval_process`.
  
  * After an agreement has been reached to proceed, the Member Node requests a DataONE identity which grants access to https://docs.dataone.org/ and `Redmine`_ (for monitoring/tracking purposes).  MN personnel will also be added to distribution lists (such as the DataONE developers list) and meetings (bi-weekly Member Node Forum, etc.). 

* **Scope the implementation**

  The decisions made during this step will drive the details of planning the implementation below.  

  * Data: First, the MN should decide how much of and what data they wish to make discoverable via DataONE.  Some MNs choose to expose all their data, others only some, and still others expose all their data to a limited audience.  

    The MN should also consider the mutability of their data; i.e. is their data static or continuously updated, or a combination of these characteristics.

  * DataONE Functionality: In conjunction with defining the scope of their holdings made visible via DataONE, the MNs also must :doc:`select-tier`

    Member Nodes choose to expose various services, which we have organized into four tiers, starting with the simple read only access (Tier 1) and progressing through more complex services including authentication (Tier 2), write access (Tier 3), and replication (Tier 4). Select the level of functionality that the MN will provide as a partner in the DataONE infrastructure.

  * Member Node Software Stack: Decide if the MN will be fully or partially based on an existing software stack, such as Metacat or GMN, or if a completely custom implementation is required, or if a hybrid approach will be used to adapt an existing DataONE compatible software system to interact with an existing repository system.

* :doc:`implementation-planning` 

  After determining the scope of data holdings to be exposed via DataONE and the related questions above, the MN will determine the best approach for the MN implementation. 
  
  #. The MN will need to plan for any needed infrastructure changes at their site.
  
  #. Data: if not all data holdings will be made discoverable via DataONE, the MN will need to plan/develop a mechanism to identify what data is to be harvested or create a subset of data for DataONE use.  
    In any case, each data object will need to be assigned a DOI if not already assigned one "locally".
  
  #. Functionality: Based on the desired Tier of operations, the MN may need to implement additional [security measures - this isn't the right way to say this].
  
  #. Software Stack/other development: Depending on resource requirements for any software development (i.e. new/modified software stack), the MN should plan to allocate appropriate (human) resources to the effort.
  
    Determine if there will be new data formats or new metadata formats which need to be registered.  An example of this might be [put an example here].  
    If there is no software stack development or no new data/metadata formats to be registered, the Developing phase will be less costly in terms of time and resources.
    
  #. Define a data management plan.  If the MN already has an institutional DMP in place, this may be used or modified to reflect interactions with DataONE.
  
  #. Consider the question of persistent identifiers (related to the mutability of data issue). See `Identifiers in DataONE`_.

Developing
~~~~~~~~~~~

The scope of the developing phase is to build and test a working member node that 
passes the basic tests in the web-based Member Node Tester.  The main things to 
put in place are the member node itself and any formats that would be new to 
DataONE.

  
* **Develop MN Software**

  Unless you are fortunate to already be using Metacat, or don't have an existing
  data collection, developing the Member Node usually involves writing at least
  some integration code, and for some organizations, implementing the API methods
  themselves.  At this point in the process you will be simply following your
  development plan.  
  
  You can iteratively use the web-based Member Node testing service throughout
  your development process to measure incremental progress.
  
  * :doc:`development-iteration`
  * :doc:`development-testing`
  * :doc:`test-system`
  
    

* **Register Formats**

  If you are working with a format new to DataONE, it will need to be registered 
  before D1 can successfully synchronize content registered with that format. This 
  is a distinct process that is also set up to run outside of Member Node deployment.  
  If you are registering a new *metadata* format, DataONE developers will need to 
  build, test, and deploy an indexing parser and html renderer to the CNs.  Testing 
  these elements is best done in DEV, with the content of the new format originating
  either from the new member node or by submitting sample content to an existing
  node in the DEV environment.  This decision should be discussed with coredev.


* **Passing MN Tests?**

  Once the required tests of the Member Node testing service are passing, (see
  :doc:`development-testing`)  the prospective Member Node is ready to enter the 
  Testing phase, where more thorough testing is done.
  


Testing
~~~~~~~~

Once all data formats are registered and your software is fully developed, 
whether by yourself or by utilizing an existing MN software stack, you can then 
deploy and configure your node and register it to our Stage environment to allow 
us to conduct a real-world test in an environment that is identical to the 
Production environment.  The end-point of this phase is a fully functional and 
integrated Member Node "in production".

* **Test in STAGE**

  STAGE testing allows DataONE to conduct a real-world tests in an environment 
  that is identical to the Production environment.  It is the first time that the 
  entire Member Node's content is synchronized, so this is the place where 
  non-systematic content issues are usually revealed. Configuration issues are also 
  identified here, especially related to certificates and user subjects.

  STAGE testing involves the following steps::

  1. Member Node team registers the live Member Node into STAGE environment  (see :doc:`registration`)

  2. Member Node Service tests are run against the node to uncover any configuration
     or content issues.

  3. DataONE operations support approves the node registration and the node begins
     synchronizing content.  DataONE reports back any problems that might arise.

  4. The Member Node team and DataONE jointly reviews the presentation of content 
     in ONEMercury.
   

* **Deploy in Production Environment**

  After successful testing in the Stage environment, the MN can be deployed and 
  registered in the Production environment (see :doc:`register-in-production`). 
  Registering the MN in the Production environment is the final technical step 
  required for DataONE to approve the node and for it to enter into operational 
  status.


* **Mutual Acceptance**

  After the node is registered in the Production environment, both the node operators 
  and DataONE will do a final review on the node to determine that it is operating 
  as expected. This includes checks for content disparities and other issues that 
  may not be detected by the automated tests. The node description and other 
  metadata are checked for consistency and clarity. When the review is complete, 
  both DataONE and the node operators mutually approve the registration and move 
  the MN into an operational state.

  :doc:`mutual-acceptance`


Operating
~~~~~~~~~

Operate the MN in production.

* **Announcement**

  The MN organization announces the new MN and DataONE showcases the MN through 
  channels such as the DataONE newsletter and press releases.

* **Ongoing Production operations**

  The MN is operational and delivers services to the broader research community.  
  Coordinating nodes monitor the MN to ensure that it operates as intended. The 
  node's data and metadata are made available via the various MN and Coordinating 
  MN services.  Logs are kept on all services provided, and the Coordinating nodes 
  provide automated access to aggregated statistics back to the MN operators.

* **Participate in MN forums**

  The MN organization participates in MN forums to help monitor and evolve the 
  DataONE federation to meet the research data needs of the community.

.. _Contact Us: https://www.dataone.org/contact
  
.. _DataONE: http://www.dataone.org/

.. _Redmine: http://redmine.dataone.org/

.. _DataONE Partnership Guidelines: http://www.dataone.org/sites/all/documents/DataONE_MN_Partner_Guidelines.pdf

.. _DataONE Member Node API: https://mule1.dataone.org/ArchitectureDocs-current/apis/MN_APIs.html

.. _Member Node Description Document: http://www.dataone.org/sites/all/documents/Member_Node_Description_Form_2012Jun20_Formatted.docx

.. _Identifiers in DataONE: http://mule1.dataone.org/ArchitectureDocs-current/design/PIDs.html
