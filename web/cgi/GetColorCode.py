#coding=utf8
import web, site_helper, os, uuid

class GetColorCode:
    def POST(self):
        i = web.input()
        assert(i.has_key('type') and i.type.isalnum())
        file_name = str(uuid.uuid4())+'.'+i.type
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code.encode('utf8'))
        f.close()
        os.system('cd %s\n vim -f +"let g:html_use_css = 0" +"syn on" +"run! syntax/2html.vim" +"wq" +"q" %s' % (site_helper.config.APP_ROOT_PATH+'web/codes/',file_name))
        return open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.html').read().partition('<body')[2].partition('>')[2].rpartition('</body>')[0]
