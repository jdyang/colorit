#coding=utf8
import web, site_helper, os, uuid

class GetColorCode:

    def GET(self):
        return 'a'

    def _readLangMaps():
        ret_dict = {}
        for l in open('%s/web/vimfiles/langmap' % site_helper.config.APP_ROOT_PATH):
            assert(l.count('%%') == 1 and l.count('"') == 0)
            k,temp,v = l.partition('%%')
            ret_dict[k.lower()] = v
        return ret_dict
    LANGMAP = _readLangMaps()

    def POST(self):
        i = web.input()
        web.header('Content-Type','text/plain')
        assert(i.has_key('type'))
        assert(i.has_key('options'))
        i.type = str(i.type).strip().lower()
        assert( self.LANGMAP.has_key(i.type) )
        i.type = self.LANGMAP[i.type]
        i.options = str(i.options)
        file_name = str(uuid.uuid4())+'.'+i.type
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code.encode('utf8'))
        f.close()
        script_file = site_helper.config.APP_ROOT_PATH+'web/vimfiles/vimscriptin/%s' % self._getFormatFile(i)
        assert(os.path.exists(script_file))
        os.system('cd %s\n vim  -u "%s" +"set filetype=%s" +"let html_no_rendering=1" -f -s "%s" "%s"' % ( site_helper.config.APP_ROOT_PATH+'web/codes/', site_helper.config.APP_ROOT_PATH+'web/vimfiles/vimrc', i.type, script_file, file_name ))
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.xhtml') #当使用let g:html_use_xhtml=1时，生成的后缀名就是xhtml
        code_string = f.read()
        f.close()
        code_string = self._stripTag(code_string, 'body')
        code_string = code_string.replace('\n','')
        code_string = '<div style="background-color:#000;"><code style="margin:20px;color:#45ED00;display:block;">%s</code></div>' % code_string
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
