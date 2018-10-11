Node Registration / Update Script
=================================

:Document Status:

  ========= ==================================================================
  Status    Comment
  ========= ==================================================================
  DRAFT     (CSJ) Initial draft
  REVIEWED  (RN)  clarified the dependency on xmlstarlet
  ========= ==================================================================

Node Registration Script
~~~~~~~~~~~~~~~~~~~~~~~~

Member Node operators will often use the CN API calls within languages such as 
Java and Python to register a node and update it's capabilities.  However, this 
can also be done using a simple bash script that depends on curl_ and optionally
xmlstarlet_ (for friendlier display of responses) being installed on your workstation.

DataONE maintains a number of bash scripts in the d1_client_bash_ project, and 
the d1noderegister_ script is one of those scripts.

.. _curl: http://curl.haxx.se/
.. _xmlstarlet: http://xmlstar.sourceforge.net/
.. _d1_client_bash: https://repository.dataone.org/software/cicore/trunk/itk/d1_client_bash/
.. _d1noderegister: https://repository.dataone.org/software/cicore/trunk/itk/d1_client_bash/d1noderegister
 
To use this script to register a Member Node in a DataONE environment, copy the 
script into a file called `d1noderegister`, and ensure that the file is 
executable. On Mac and Linux (Windows via Cygwin), this can be done with the 
following commands:

::
  
  $ curl -k -o d1noderegister \
   "https://repository.dataone.org/software/cicore/trunk/itk/d1_client_bash/d1noderegister"
  $ chmod +x ./d1noderegister
  
To see the options for the command, use the `-h flag`:

::
  
  $ ./d1noderegister -h
  
An example of simple usage would be:

::
  
  $ ./d1noderegister -f node.xml -b https://cn-dev.test.dataone.org/cn -E client.pem
  
The above command would register the MN described by the node.xml document with 
the DataONE development environment, using the concatenated client SSL 
certificate and key issued to the MN by DataONE.  See the `example node document`_ 
that shows some typical Tier 1 Member Node values, using the USGSCSAS node values.

.. _`example node document`: https://repository.dataone.org/documents/Projects/cicore/operations/source/member_node_deployment/example-files/node-example.xml

Update Node Capabilities Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once a node has been registered in an environment, there are times during ongoing 
operations that the Node information needs to be updated.  For instance, for 
scheduled system maintenance, a Member Node may be unavailable for a short time, 
and the Node.state should be set to `down` to reflect the temporary outage.

To update a node using bash simple script, use the d1nodeupdate_ utility.

Copy the script into a file called `d1nodeupdate`, and ensure that the file is 
executable. On Mac and Linux (Windows via Cygwin), this can be done with the 
following commands:

::
  
  $ curl -k -o d1nodeupdate \
   "https://repository.dataone.org/software/cicore/trunk/itk/d1_client_bash/d1nodeupdate"
  $ chmod +x ./d1nodeupdate
  
To see the options for the command, use the `-h flag`:

::
  
  $ ./d1nodeupdate -h
  
An example of simple usage would be:

::
  
  $ ./d1nodeupdate -f node.xml -b https://cn-dev.test.dataone.org/cn -E client.pem
  
The above command would update the MN described by the node.xml document with 
the DataONE development environment, using the concatenated client SSL certificate 
and key issued to the MN by DataONE.

.. _d1nodeupdate: https://repository.dataone.org/software/cicore/trunk/itk/d1_client_bash/d1noderegister


