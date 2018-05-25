Setting Hostname on Ubuntu
==========================

For server ``my-server.dataone.org`` with IP ``12.34.56.78``:

``/etc/hostname``::

  my-server

``/etc/hosts``::

  127.0.0.1 localhost
  12.34.56.78 my-server.dataone.org my-server

  # The following lines are desirable for IPv6 capable hosts
  ::1     localhost ip6-localhost ip6-loopback
  fe00::0 ip6-localnet
  ff00::0 ip6-mcastprefix
  ff02::1 ip6-allnodes
  ff02::2 ip6-allrouters


Then reboot or::

  sudo hostname my-server

