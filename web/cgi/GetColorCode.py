#coding=utf8
import web, site_helper, os, uuid

class GetColorCode:
    def POST(self):
        i = web.input()
        assert(i.has_key('type') and i.type.strip().isalnum())
        file_name = str(uuid.uuid4())+'.'+i.type.strip()
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code.encode('utf8'))
        f.close()
        os.system('cd %s\n vim -f +"let g:html_use_css = 0" +"syn on" +"run! syntax/2html.vim" +"wq" +"q" %s' % (site_helper.config.APP_ROOT_PATH+'web/codes/',file_name))
        code_string = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.html').read()
        code_string = self._stripTag(code_string, 'body')
        #code_string = self._stripTag(code_string, 'font')
        #code_string = code_string.replace('font', 'span')
        return code_string

    def _stripTag(self, code_string, tag_name):
        return code_string.partition('<%s' % tag_name)[2].partition('>')[2].rpartition('</%s>' % tag_name)[0]
