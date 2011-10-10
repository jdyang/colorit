#coding=utf8
import web, site_helper, os

class GetColorCode:
    def POST(self):
        i = web.input()
        file_name = 'temp.py'
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code)
        f.close()
        os.system('cd %s\n vim -f +"set nonumber" +"let g:html_use_css = 0" +"syn on" +"run! syntax/2html.vim" +"wq" +"q" %s' % (site_helper.config.APP_ROOT_PATH+'web/codes/',file_name))
        return open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.html').read().partition('<body')[2].partition('>')[2].rpartition('</body>')[0]
