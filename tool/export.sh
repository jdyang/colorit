#!/bin/bash
# replace for colorcode

if [ "x$(whoami)" != "xroot" ]; then
    echo "Only root can run this script."
    exit 1
fi

rev="$1"

if [ "x${rev}" == "x" ]; then
    echo "Usage: $(basename $0) {rev}"
    exit 1
fi

cd /opt/colorcode.git
git archive "${rev}" -o /tmp/colorcode.tgz
ret=$?

if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when archiving."
    exit 1
fi

cd /opt
tar xf /tmp/colorcode.tgz

cat /opt/colorcode/conf/colorcode.nginx.conf > /etc/nginx/sites-enabled/colorcode.nginx.conf

chown www-data:www-data -R /opt/colorcode

/opt/colorcode/tool/spawn-fcgi.sh stop
/opt/colorcode/tool/spawn-fcgi.sh start
/etc/init.d/nginx restart
