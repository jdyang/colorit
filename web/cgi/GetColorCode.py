#coding=utf8
import web, site_helper, os, uuid

class GetColorCode:
    def POST(self):
        i = web.input()
        assert(i.has_key('type') and i.type.strip().isalnum())
        assert(i.has_key('options'))
        i.type = str(i.type)
        i.options = str(i.options)
        file_name = str(uuid.uuid4())+'.'+i.type.strip()
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code.encode('utf8'))
        f.close()
        script_file = site_helper.config.APP_ROOT_PATH+'web/vimscriptin/%s' % self._getFormatFile(i)
        assert(os.path.exists(script_file))
        os.system('cd %s\n vim  -f -s "%s" %s' % ( site_helper.config.APP_ROOT_PATH+'web/codes/', script_file, file_name ))
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.xhtml') #当使用let g:html_use_xhtml=1时，生成的后缀名就是xhtml
        code_string = f.read()
        f.close()
        code_string = self._stripTag(code_string, 'body')
        code_string = code_string.replace('\n','')
        code_string = '<div style="background-color:#000;color:#45ED00;"><code>%s</code></div>' % code_string
        return code_string

    def _stripTag(self, code_string, tag_name):
        return code_string.partition('<%s' % tag_name)[2].partition('>')[2].rpartition('</%s>' % tag_name)[0]

    def _getFormatFile(self, i):
        if self._contentAll(i.options, 'format', 'number'):
            return 'number_format'
        elif 'format' in i.options:
            return 'format'
        elif 'number' in i.options:
            return 'number'
        else:
            return 'simple'

    def _contentAll(self, s, *l):
        return all(map(lambda x:x in s,l))
