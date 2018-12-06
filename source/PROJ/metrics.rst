Metrics
=======

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   metrics_contributors
   metrics_list_membernodes
   metrics_object_counts

Amount of Content
-----------------


 


Number of Contributors
----------------------

A contributor is a subject that is identified as an author of a dataset.

Authors can be:

* The subject that added the content to DataONE. This is expressed in the system metadata as the ``submitter``. However, the submitter may not be the author or creator of the content. For example, a data manager who had no involvement in the creation of the dataset may have uploaded the content.

* The authors identified in the science metadata associated with the dataset. The DataONE indexing service extracts this information from the metadata and populates the ``author`` and related fields of the search index. 


Submission Contributors
.......................

Submission contributors is expressed as a single system metadata property which is indexed to the ``submitter`` field.

The unique values of ``submitter`` can be determined by examining the solr index with a facet query::

  https://cn.dataone.org/cn/v2/query/solr/
    ?q=*%3A*
    &facet=on
    &rows=0
    &facet.limit=-1
    &facet.field=investigator

which can be processed with using ``xmlstarlet`` and ``wc`` as small bash script to show the number of unique values:

.. literalinclude:: scripts/field_count.sh
   :language: bash
   :linenos:

As of this writing, the number of unique ``submitters`` is::

  ./field_count submiter
    16340  


Authorship Contributors
.......................

Authorship information is expressed in several fields in the `solr index <http://indexer-documentation.readthedocs.io/en/latest/generated/solr_schema.html>`_:

======================== ========
Field                    Count
======================== ========
``author``               24636 
``authorGivenName``      11908
``authorLastName``       5863     
``authorSurName``        24648
``authorSurNameSort``    24219
``investigator``         111826
``investigatorText``     64246
``origin``               108693
``originText``           64209
``originator``           0
``originatorText``       64209
``prov_generatedByUser`` 0
======================== ========

In order to provide a realistic count, it would be necessary to retrieve the values from the fields of interest, normalize them to a standard representation, then count the resulting unique values.



