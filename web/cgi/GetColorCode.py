#coding=utf8
import web, site_helper, os, uuid

class GetColorCode:
    def POST(self):
        i = web.input()
        assert(i.has_key('type') and i.type.strip().isalnum())
        assert(i.has_key('options'))
        file_name = str(uuid.uuid4())+'.'+i.type.strip()
        f = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name,'w')
        f.write(i.code.encode('utf8'))
        f.close()
        script_file = self._getFormatFile(i)
        assert(os.path.exists(site_helper.config.APP_ROOT_PATH+'web/vimscriptin/%s' % script_file))
        os.system('cd %s\n vim  -f -s "%s" %s' % ( site_helper.config.APP_ROOT_PATH+'web/codes/', site_helper.config.APP_ROOT_PATH+'web/vimscriptin/format', file_name ))
        code_string = open(site_helper.config.APP_ROOT_PATH+'web/codes/'+file_name+'.html').read()
        code_string = self._stripTag(code_string, 'body')
        return code_string

    def _stripTag(self, code_string, tag_name):
        return code_string.partition('<%s' % tag_name)[2].partition('>')[2].rpartition('</%s>' % tag_name)[0]

    def _getFormatFile(self, i):
        if ('format' and 'number') in i.options:
            return 'number_format'
        elif 'format' in i.options:
            return 'format'
        elif 'number' in i.options:
            return 'number'
        else:
            return 'simple'

