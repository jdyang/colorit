#!/bin/bash
if [ "x$(whoami)" != "xroot" ]; then
    echo "Only root can run this script."
    exit 1
fi

PWD="/opt/colorit"

cd "/opt"
ln -s ~/colorit colorit
echo "ln -s ~/colorit /opt/colorit"
ret=$?
if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when ln -s~/colorit /opt/colorit, please contact sparker5."
    exit 1
fi


mkdir "${PWD}/logs"
echo "mkdir ${PWD}/logs"
ret=$?
if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when mkdir ${PWD}/logs, please contact sparker5."
    exit 1
fi

mkdir "${PWD}/web/codes"
echo "mkdir ${PWD}/web/codes"
ret=$?
if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when mkdir ${PWD}/web/codes, please contact sparker5."
    exit 1
fi

echo "127.0.0.1 colorit" >> /etc/hosts
echo "echo \"127.0.0.1 colorit\" >> /etc/hosts"
ret=$?
if [ "x${ret}" != "x0" ]; then
    echo "An error occurs when echo \"127.0.0.1 colorit\" >> /etc/hosts, please contact sparker5."
    exit 1
fi

echo "success"

cp ${ret}/web/vimfiles/vimsyntax/* /usr/share/vim/vim73/syntax/
echo "cp ${ret}/web/vimfiles/vimsyntax/* /usr/share/vim/vim73/syntax/"
