#!/usr/bin/env python
import web, os , nginx_uwsgi ,  GetColorCode
web.config.debug = False

app = web.application(('/cgi/getcolorcode','GetColorCode',), {'GetColorCode':GetColorCode.GetColorCode})

app.notfound = lambda:web.seeother('/')

if __name__ == "__main__":
    app.run()

