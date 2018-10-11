.. _test-system:

Establish a test system
=======================

:Document Status:
  ======== ==================================================================
  Status   Comment
  ======== ==================================================================
  DRAFT    (MBJ) Initial draft
  DRAFT    (Dahl)
  ======== ==================================================================


Once a strategy has been chosen for a technical implementation, Member Node developers should establish a test server. A test server is a physical or virtual machine that runs the MN software that is under development and that can be reached from the Internet.

For those choosing existing software stacks, this means installing the operating system, all of the prerequisite software, and then installing the DataONE-enabled repository software itself. Our reference implementations have been built using Ubuntu Linux 10.04 LTS, and we will be migrating to Ubuntu 12.04 LTS.

In the early phases of development, when the new MN is not yet ready for general testing, MN developers will typically need to perform basic compliance testing of specific REST APIs that they are currently implementing. For this purpose, DataONE provides the `Member Node Check`_ service. The service performs a series of calls to the REST API endpoints that a MN of a given tier must support. It then analyses the responses from the MN and provides a compliance report for each of the APIs. The Member Node Check service can run tests against any server that can be reached from the Internet.


.. _CNRegister.register(): http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.register
.. _CNregister.updateNodeCapabilities(): http://mule1.dataone.org/ArchitectureDocs-current/apis/CN_APIs.html#CNRegister.updateNodeCapabilities
.. _verified: http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Person.verified
.. _Node: http://mule1.dataone.org/ArchitectureDocs-current/apis/Types.html#Types.Node
.. _Member Node Check: http://mncheck.test.dataone.org:8080
.. _multiple deployment environments: ../environments.html
.. _Dev environment: https://cn-dev.test.dataone.org/cn
.. _Sandbox environment: https://cn-sandbox.test.dataone.org/cn
.. _Staging environment: https://cn-stage.test.dataone.org/cn
