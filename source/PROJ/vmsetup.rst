Virtual Machine Setup
=====================

cn.server.publiccert.filename=/etc/letsencrypt/live/cn-stage-2.test.dataone.org/cert.pem
environment.hosts=cn-stage-2.test.dataone.org cn-stage-unm-2.test.dataone.org

Kernel Purging
--------------

``/etc/cron.daily/purge-old-kernels``::

  #!/bin/bash
  /usr/local/bin/purge_old_kernels.py -q

Ensure to ``chmod a+x /etc/cron.daily/purge-old-kernels``.

s
Use Xenial Kernel
-----------------

Due to:
 
 https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1787127

it was necessary to upgrade many servers to use the 4.x kernel version.

::

  sudo apt-get install linux-generic-lts-xenial

then restart to pick up the new kernel.


LVM Resize
----------

Add new device.

Recognize new device::

  apt-get install scsitools
  rescan-scsi-bus.sh

Format the new disk::

  fdisk /dev/sdb
    n (for new partition)
    p (for primary partition)
    1 (partition number)
    (keep the other values default)
    w (write changes)

  fdisk /dev/sdb
    t (change the partition type)
    8e (for Linux LVM)
    w (write changes)

Initialize LVM physical volume::

  pvcreate /dev/sdb1

Determine name of volume group::

  vgdisplay

Add physical volume to volume group::

  vgextend name_of_volume_group /dev/sdb1

New free space should appear in::

  vgdisplay

Resize logical volumes to use free space::

  lvdisplay

Add space to the logical volume::

  lvresize --resizefs --size +931GB /dev/name_of_volume_group/Name

or more manually, add space to a logical volume::

  lvextend -L +100G /dev/name_of_volume_group/Name

then resize the filesystem (ext4)::
  
  resize2fs /dev/name_of_volume_group/Name

