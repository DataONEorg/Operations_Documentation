DataONE infrastructure environments
===================================

In addition to the production environment that the end user sees when
interacting with DataONE services, DataONE maintains several other independent
environments for development and testing.  These environments emulate the 
production environment and allow developing and testing of DataONE components 
without affecting the production environment.

Each environment is a set of Coordinating Nodes (CNs) along with a set of Member 
Nodes (MNs) that are registered to those CNs.  Each environment maintain sets of 
content, formats, and DataONE identities independent of each other.  By registering 
a MN to an environment, you enable content to synchronize with the CNs, and be
replicated to other nodes in the same environment. 

Since there are no connections between the environments, information registered 
in one environment - certificates, DataONE identities, and formats - cannot be 
carried over into another environment.

The environments are:

=========== =================================== ======================================================================================================
Environment URL                                 Description
=========== =================================== ======================================================================================================
Production  https://cn.dataone.org              Stable production environment for use by the public.
Staging     https://cn-stage.test.dataone.org   Testing of release candidates.
Sandbox     https://cn-sandbox.test.dataone.org Like Production, but open to test instances of MNs. May contain both test and real science objects.
Development https://cn-dev.test.dataone.org     Unstable components under active development.
=========== =================================== ======================================================================================================

The Production environment is only used by completed MNs that hold production
quality data.

If a MN is under development or if it is experimental in nature, for instance,
if the purpose is to learn more about the DataONE infrastructure or if the MN
will be populated with objects that may not be of production quality, one of the
test environments should be used.

To register a Member Node into an environment, follow the steps in :doc:`registration`.
