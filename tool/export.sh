#!/bin/bash
# replace for colorit

if [ "x$(whoami)" != "xroot" ]; then
    echo "Only root can run this script."
    exit 1
fi

rev="$1"

if [ "x${rev}" == "x" ]; then
    echo "Usage: $(basename $0) {rev}"
    exit 1
fi

cd /opt/colorit.git
git archive "${rev}" -o /tmp/colorit.tgz
ret=$?

if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when archiving."
    exit 1
fi

cd /opt/colorit
tar xf /tmp/colorit.tgz

cat /opt/colorit/conf/colorit.nginx.conf > /etc/nginx/sites-enabled/colorit.nginx.conf

chown www-data:www-data -R /opt/colorit

/opt/colorit/tool/spawn-fcgi.sh stop
/opt/colorit/tool/spawn-fcgi.sh start
/etc/init.d/nginx restart
