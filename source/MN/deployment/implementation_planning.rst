Plan the implementation
=======================

**Status: Draft**

Each institution that wishes to join DataONE as a MN will have unique decisions to make with regard to their MN implementation. The end goal is to be able to serve content (data and metadata) as part of the larger network. There may be many possible paths to this goal, each with different demands on available resources and with different amounts of technical effort involved.

Since there are a number of groups with expertise in the DataONE API and other software, MN developers should communicate with fellow developers and the DataONE development team in order to capitalize on previous experience before selecting an implementation strategy and during implementation. Based on the requirements of the organization, input from fellow developers and the DataONE development team, MN developers should create an implementation plan that will guide the development, testing, deployment and maintenance of the service.

Operators should understand the :doc:`DataONE MN Tiers <select-tier>`, and should consider different software approaches when developing this plan.


Choosing an implementation approach
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When planning the MN implementation, developers should consider the following
possibilities, listed in order of increasing effort.

(A) Use an existing repository that already has a DataONE API

(B) Modify existing software that implements the DataONE API to work with an existing repository

(C) Use existing DataONE libraries to add DataONE APIs to an existing repository

(D) Write custom software from scratch that implements the DataONE API and communicates with an existing repository

(E) Write a custom repository with a DataONE API from scratch.

For (A) and (B), DataONE provides two complete MN implementations that can be
used for exposing data to DataONE. These are :term:`Metacat` and :term:`GMN`.
Both support all MN tiers. Other institutions have also added DataONE interfaces
to their existing repositories and these may provide good starting points.

For (C), DataONE provides the :term:`DataONE Common Library` and :term:`DataONE
Client Library` for :term:`Java` and :term:`Python`. These libraries provide
language specific abstractions for interacting with the DataONE infrastructure.
In particular, they make it easy to perform and respond to DataONE API calls and
produce and consume the DataONE types used in those calls. As there are many
subtle implementation details that relate to issues such as URL-encoding,
Unicode, REST messaging formats and working with the DataONE types, it is highly
recommended to use these libraries if possible.

For (D) and (E), DataONE provides extensive documentation of the DataONE API and
types. The documentation covers details such as URL-encoding, REST messaging
formats and usage for all APIs. In addition, developers should work with the
community and the DataONE development team to ensure that their implementation
is correct. All the existing implementations are open source, and can be
consulted if anything is unclear in the documentation. The source is available
in the `DataONE Subversion Repository`_.

Even if a MN will eventually require a custom implementation, it may be possible
to use an existing MN implementation to quickly get an MN online, so that the
organization can have a presense on DataONE while a fully functional MN is being
implemented.

:TODO: Create a page for existing MN implementations

:TODO: Verify that the Java Client Library page is up to date

:TODO: Point to releases.dataone.org for common and libclient downloads

.. _DataONE Subversion Repository: https://repository.dataone.org/software/cicore
.. _Metacat: https://knb.ecoinformatics.org/software/metacat
.. _`GMN (Generic Member Node)`: https://pypi.python.org/pypi/dataone.generic_member_node/1.1.1RC6
