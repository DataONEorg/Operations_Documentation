Enter / Exit Read Only Mode
===========================

Putting a DataONE envrionment in read only mode is achieved by turning off the 
``d1-processing`` service which should be running only on the primary CN.

Synopsis
--------

To shutdown ``d1-processing``:

1. Set the service control properties to ``FALSE`` on the primary CN
2. Check that batch processing has completed
3. Shutdown the ``da-processing`` service

To startup ``d1-processing``:

1. Set the service control properties to ``TRUE``
2. Start the ``d1-processing`` service on the primary CN

Entering read only mode
-----------------------

``d1-processing`` is responsible for synchronization, replication, and 
log aggregation. Each of these processes involves long-running batches of
work where uncontrolled disruption of the batch may leave work in an incomplete
state. ``d1-processing`` monitors service control properties and will initiate
orderly shutdown of services when the value of the property changes to 
``FALSE``. Hence, ``d1-processing`` should always be shut down in a controlled 
manner by toggling the value of the service control properties.

``d1-processing`` monitors three property files, one for each of 
synchronization, replication, and log aggregation. The property files are
located under ``/etc/dataone/process``.

================ =============================== ==========================
Process          Property File                   Service Control Property
================ =============================== ==========================
Synchronization  ``synchronization.properties``  ``Synchronization.active``
Replication      ``replication.properties``      ``Replication.active``
Log Aggregation  ``logAggregation.properties``   ``LogAggregator.active``
================ =============================== ==========================

In each case, the valid values for the service control property are ``TRUE`` or
``FALSE``, with ``FALSE`` indicating the service should shut itself down if
running and not start when the ``d1-processing`` service starts up.

The value of the property can be set by directly editing the properties file or
through a utility that can toggle the values. On the CNs, the script 
``/usr/local/bin/d1processingstate`` will report and set the value of the 
service control property for each of the three services::

  $ d1processingstate
  Synchronization.active=TRUE
  Replication.active=TRUE
  LogAggregator.active=TRUE

  $ sudo d1processingstate FALSE
  Previous:  Synchronization.active=TRUE
  New:       Synchronization.active=FALSE
  Previous:  Replication.active=TRUE
  New:       Replication.active=FALSE
  Previous:  LogAggregator.active=TRUE
  New:       LogAggregator.active=FALSE


A fabric script to toggle service values is also available for remotely setting
the service control property values::

  d1cnprocessingstate -S FALSE -H cn-orc-1.dataone.org

After setting the service control properties to FALSE, it may take some time 
for services to shutdown before the ``d1-processing`` service can be shutdown.

The state of the services can be determined by watching the respective service 
logs.

================ ==========================================================
Process          Log File  
================ ==========================================================
Synchronization  ``/var/log/dataone/synchronize/cn-synchronization.log``
Replication      ``/var/log/dataone/replicate/cn-replication.log``
Log Aggregation  ``/var/log/dataone/logAggregate/cn-aggregation.log``
================ ==========================================================

The ``cn-synchronization.log`` will emit a message like::

  [ WARN] 2018-07-02 11:51:10,000 [SynchronizationQuartzScheduler_Worker-21]  (MemberNodeHarvestJob:execute:75) null-  ObjectListHarvestTask Disabled
  [ WARN] 2018-07-02 11:51:47,982 [SynchronizationQuartzScheduler_Worker-20]  (SyncMetricLogJob:execute:50) SyncMetricLogJob Disabled


When satisfied that ``d1-processing`` activity has completed, the service may 
be stopped::

  sudo service d1-processing stop


Exiting readonly mode
---------------------

Exiting read only mode requires ensuring that the service control properties are
set to ``TRUE`` then starting the ``d1-processing`` service::

  $ sudo d1processingstate TRUE
  Previous:  Synchronization.active=FALSE
  New:       Synchronization.active=TRUE
  Previous:  Replication.active=FALSE
  New:       Replication.active=TRUE
  Previous:  LogAggregator.active=FALSE
  New:       LogAggregator.active=TRUE

  $ sudo service d1-processing start



