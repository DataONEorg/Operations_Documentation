.. _development-testing:

Development Testing
===================

.. contents::

Development testing is done to make sure that the future Member Node is ready 
for real-world testing in the staging environment.  This includes testing for 
correct method responses under different circumstances, making sure that 
metadata and resource maps parse and are usable, and that the formats used 
by the node are registered.  

To accomplish this, DataONE has developed a suite of tests that are used to test
our own Member Node implementations.  For convenience, we have deployed these
tests as a web-based `Member Node testing service <http://mncheck.test.dataone.org:8080/>`_.
Those already familiar with Maven and JUnit may instead wish to download the 
tests from our code repository and run the tests locally. Passing all of the 
required tests will signal readiness to enter the deployment phase.

While Member Node developers are encouraged to run the MN testing service at any point in 
their internal development process, the primary source of guidance on *how* 
to implement a method should be the DataONE architecture documentation 
and API reference.  When troubleshooting failed tests, in general, careful 
rereading of the method documentation in the context of the failure message is the
best way to understand what exactly went wrong, as well as looking at the source
code of the test.  Developers are also welcome to contact the DataONE development 
team for more information and explanation.

Member Node Tester 
------------------
Multiple versions of the testers are maintained, corresponding to the major.minor 
versions of the published API.  Within each tester, the testing service is 
organized by Tier, so that Tier1 API methods are tested before Tier2 methods, 
and so on.  Results are also organized by tier, and a summary for each subset 
of tests is given.  If you are planning to deploy a Tier 1 node, then of course 
only worry about testing and passing Tier 1 methods.


Testing Requirements
~~~~~~~~~~~~~~~~~~~~
Requirements for testing vary from tier to tier.  Most tests rely on existing 
content, except MN_Storage methods, which need to test the create, update, and 
archive methods.  Below are listed the general content related requirements for
each Tier.


Tier 1 Nodes
++++++++++++
Most of the Tier1 tests rely on listObjects to get an identifier that can be used
to run Tier 1 tests.  So, Tier 1 nodes need to have at least one object.  Tier 1
also tests that resource maps can be parsed, so if there is only one object, it 
should be a resource map.  Ideally, a member node would have a representative
object for all of the data formats it has objects of.

Tier 2 Nodes
++++++++++++
The bulk of Tier 2 testing is testing data security, and so the member node needs
to load a set of objects with the pre-defined access policies.  

TODO: make the test objects available as a download.

Tier 3 & 4 Nodes
++++++++++++++++
If you are implementing a Tier 3 node, you do not need to start with any content
in the node to test Tier 1 and 2 methods.  Instead, the testers will create the 
data objects they need, provided that the create method is working properly.

You will probably, however, wish to clear out the test objects if the node under
test is going into production.

TODO: instructions on how to identify these objects (they all have the same owner, 
I believe)

Tier 4 tests are limited to testing exception handling, since most of this 
functionality requires interaction with Coordinating nodes and other member nodes.


Anatomy of tester failure messages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Tests can fail for many reasons, so the best a failure message can hope to do is
be clear about the circumstances that caused the failure, and provide relevant 
diagnostic information.  Each failure message is composed of the following parts:

#. The failure description 
#. REST call details
#. stack trace

Of the three, the **failure description** is the most useful for understanding the 
what failed.  In some cases the description is the exception thrown (Class name\::
detail code: http status: exception message), and in other cases it is just a 
message explaining the failure.

The **REST call details** are useful for recreating the call that resulted in a failure.
Remembering that many tests (especially in Tier1) first call listObjects to get
an identifier to work with for the main test, do not be surprised to see a problem
in listObjects even if the test is for another method. Also note that in cases 
where it is known that the failure is client-side (not server side), the REST 
call is usually not provided.

The **stack trace** is there to debug client-side exceptions, or to find the spot 
in the *client* code that where an exception was thrown.  Usually, this only 
helpful with content related problems.

Identifier Encoding Tests
~~~~~~~~~~~~~~~~~~~~~~~~~
For the methods that take an Identifier in the URL of the method call, identifier
encoding tests are performed to make sure that the Member Node can handle the 
encoded identifiers properly.  About 30 identifiers using characters from 
different ranges of the Unicode standard are tested against each of these methods.

If one example fails, the entire test fails, and you will need to do some detective
work to find out the problem.  Comparing suspicious characters in the failing 
identifier to characters in the passing examples can help to narrow the problem.
Also, in the name of the identifier itself is a terse indication of the types of
characters being tested, and in one case, the word 'tomcat' is used as it was
first found to be problematic with certain tomcat web server configurations.



Authentication and Authorization Tests
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Tier 2 and higher MNs will be subject to Authorization and Authentication testings.
In this case, it is mostly the same API method being tested under different 
circumstances, and to ensure that various Access Policies are being interpreted
correctly vs. a set of users (as represented by calls made by the testing service
using different X509 client certificates).

As with the Identifier encoding tests, each test contains several related examples.
and so comparing failing examples to passing examples gives a sense of where the
problem may be.  Often times, one root problem in the MN's authorization algorithm 
can cause dozens of failures.

For consistency with other DataONE nodes, DataONE strongly recommends using the
reference authorization algorithms in d1_common_python or d1_common_java if at
all possible.  For those not using these packages, note that not only the algorithm
will need to be transcribed, but you will need to also need to do Subject
comparisons on canonical serializations of the client subject(s) and Subjects 
in the object's AccessPolicy.



Alternate Testing Approaches
----------------------------
If the web tester facility is not flexible enough, the d1_integration package is 
available for download, so that it can be run from a local machine. Testing Tier2 
and higher nodes will require some setup and acquisition of testing certificates 
to work, however.



