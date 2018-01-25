DataONE Environments
====================

An "environment" in the context of these documents refers to a complete installation of the components necessary to provide a functional DataONE federation. Each environment is completely independent of others which facilitates testing of new software releases within an environment without impacting others.

Each environment is completely disconnected from other environments - there is no communication between systems participating in different environments.

End users will typically only interact with the Production environment. All other environments are used for development and testing purposes.

.. list-table:: Table 1. Environments used by DataONE infrastructure.
   :widths: 1 2 8
   :header-rows: 1

   * - Environment
     - Role
     - Description
   * - Production
     - Production
     - The *production* environment operates the DataONE production infrastructure. Uptime 
       of this environment is of highest priority. Maintenance should be scheduled and users 
       must be informed via the :doc:`operations and cicore email lists </PROJ/communications>`.
   * - Stage
     - Production testing
     - The *stage* environments are used for testing Member Nodes, updates to Coordinating 
       Nodes, and any other changes before deployment or participation in the production 
       environment. Except when testing CN components, the stage environment should be 
       operating the same version software as the production environment.
   * - Stage-2
     - Production testing
     - As for the *stage* environment.
   * - Sandbox
     - Testing
     - The *sandbox* environment is used for evaluating new features and other potentially 
       disruptive changes. The sandbox environment may be running different (typically newer)
       versions of software components compared to the stage and production environments.
   * - Sandbox-2
     - Testing
     - As for the *sandbox* environment.
   * - Dev
     - New features
     - The *dev*, or *development* environment is the most volatile environment and is used for 
       developing new features or other disruptive changes. The development environment may 
       or may not be available at any point in time. Changes to the development environments 
       is coordinated within the developers via slack or email.
   * - Dev-2
     - New features
     - As for the *development* environment.


Realtime Environment Status
---------------------------

Realtime status of the various environments is available at: https://monitor.dataone.org/status

