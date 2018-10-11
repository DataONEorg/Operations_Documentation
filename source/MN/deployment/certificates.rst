Introduction to SSL Certificates
================================

.. note:: 2018-02-19

   This document is in draft status, copied mostly verbatim from subversion at: https://repository.dataone.org/documents/Projects/cicore/operations/source/member_node_deployment



DataONE uses SSL certificates, specifically X.509 certificates, to secure 
communication between Clients, Member Nodes, and Coordinating Nodes.  All three 
of these actor-types should have certificates to offer for an SSL handshake, 
although Clients making DataONE requests without certificates are allowed.  

Certificates are files that do two things:

1. assert that you are who you say you are, by establishing a chain-of-trust 
   back to an authority your system already trusts.  This is done through inclusion 
   of verifiable digital signatures of the certificate issuer and signers of the 
   certificate issuers certificate, etc.

2. contain encryption keys to be used in the connection for securing the data 
   passed back and forth.

In the case of CILogon-issued certificates for DataONE, certificates have a 
third function:

3. CILogon certificates include additional associated Subjects in DataONE that 
   can be used for Authorization.  


In very general terms, both sides of the socket connection have to trust one 
another before a connection can be established.  Both sides (peers) exchange 
their certificates, and if each side trusts the otherÕs signing entity contained 
in the certificate, the connection is established, and encryption keys are 
exchanged to allow secure transfer of information.

In the case of CILogon-issued certificates, Tier 2 and higher DataONE CNs and 
MNs extract the mapped identity and group Subjects from the certificates when 
making Authorization decisions.

Each of your systemÕs browsers maintain their own set of trusted certificate 
authority certificates (ÒCA certsÓ), largely overlapping, but not completely.  
Browsers also maintain sets of additional CA certs per user that become trusted 
upon the OK of the user.  Your system also maintains a set of root certificates, 
as does your Java installation - these are used by programmatic SSL connections.

