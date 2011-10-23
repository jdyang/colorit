#coding=utf-8
import web, MySQLdb, glob, sys

config = web.Storage({
        'APP_ROOT_PATH' : '/opt/colorit/',
        'APP_PORT' : 20003, # the port of application
        'ERROR_LOG_PATH' : '/opt/colorit/logs/errors',
})

def storage(data={}):
    return web.Storage(data)

