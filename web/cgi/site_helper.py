#coding=utf-8
import web, MySQLdb, glob, sys

config = web.Storage({
        'APP_ROOT_PATH' : '/opt/colorcode/',
        'APP_PORT' : 20003, # the port of application
})

def storage(data={}):
    return web.Storage(data)

