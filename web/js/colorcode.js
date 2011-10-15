$(function(){

    CAN_COPY_CODE = false;
    SELECTED_LANG = null;
    SMART_INDENT = true;
    SHOW_LINE_NUMBER = true;
    FONT_SIZE = 14;

    setSelectedLanguage = function(new_lang){
        SELECTED_LANG = new_lang;
        var show_current_language;
        if(new_lang.indexOf(' ') > 0){
            show_current_language = new_lang.substring(0,new_lang.indexOf(' '));
        }else{
            show_current_language = new_lang;
        };
        $('#current_lang').html(show_current_language);
    };

    //==============zeroclipboard init ===============
    ZeroClipboard.setMoviePath( '/swf/ZeroClipboard.swf' );
    CLIPBOARD = new ZeroClipboard.Client();
    CLIPBOARD.setHandCursor(true);
    CLIPBOARD.glue( 'copy_code_button', 'copy_code_container' );
    $('#copy_code_container embed').hide();
    CLIPBOARD.addEventListener( 'onMouseDown', function(){
        $('#copy_code_tip').show().fadeOut(2000);
    } );

    //==============color it function===============
    colorIt = function(){
        var options = '';
        $('#color_code_loading_overlay, #tool_box_overlay').show();
        if( SMART_INDENT ) options += 'format_';
        if( SHOW_LINE_NUMBER ) options += 'number_';
        data = {code:$('#black_code_box').val(), type:SELECTED_LANG, options:options  };
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#black_code_box').hide();
            $('#color_code_box').html(cc).show();
            $('#code_box').height(Math.max($('#black_code_box').height(), $('#color_code_box').height())+40);
            //set copy code button ready
            $('#copy_code_button').addClass('copy_code_ready');
            $('#copy_code_container embed').show();
            CAN_COPY_CODE = true;
            $('#color_code_loading_overlay, #tool_box_overlay').hide();
            CLIPBOARD.setText(cc);
        },'text');
        $('#color_it').html('clean');
        IS_SHOW_COLOR_CODE = true;
    }

    //==============clean code function===============
    IS_SHOW_COLOR_CODE = false;
    cleanCode = function(){
        $('#black_code_box').val('').show();
        $('#color_code_box').html('').hide();
        $('#code_box').height($('#black_code_box').height()+40);
        $('#color_it').html('color it');
        IS_SHOW_COLOR_CODE = false;
        //set copy code button onready
        $('#copy_code_button').removeClass('copy_code_ready');
        $('#copy_code_container embed').hide();
        CAN_COPY_CODE = false;
    };

    //==============color it button===============
    $('#color_it').click(function(){
        //如果还没有输入任何代码，就提示他输入代码
        if( (($('#black_code_box').attr('firstfocus') === 'false') || ($.trim($('#black_code_box').val().length===0))).toString() === 'true' ){
            if (IS_BLACK_CODE_BOX_BLUR === false){
                $('#black_code_box').val($('#black_code_box').val()+'Please input your code first!\n');
            };
            $('#black_code_box').attr('firstfocus','false').css('font-size','24px');
            return;
        };
        if (IS_SHOW_COLOR_CODE === false){
            if (SELECTED_LANG !== null){
                colorIt();
            }else{
                $('#choose_lang_box').toggle();
                choose_lang_box_toggle_hook();
            };
        }else{
            cleanCode();
        };
    });

    choose_lang_box_toggle_hook = function(){
        if($('#choose_lang_box').css('display') === 'block'){
            $('#choose_lang').addClass('choose_lang_active');
        }else{
            $('#choose_lang').removeClass('choose_lang_active');
        };
    
    };
    //==============choose language button===============
    $('#choose_lang').click(function(){
        $('#choose_lang_box').toggle();
        choose_lang_box_toggle_hook();
    });

    //==============choose language box===============
    $('#choose_lang_box li').click(function(){
        setSelectedLanguage($(this).attr('val'));
        if(($.trim($('#black_code_box').val()).length>0) && ($('#black_code_box').attr('firstfocus') !== 'false')){
            colorIt();
        };
        $('#choose_lang_box').hide();
        choose_lang_box_toggle_hook();
    });

    //==============checkbox change event===============
    $('#format, #number').click(function(){
        var $this = $(this);
        if($this.attr('id') === 'format'){
            if($this.html() === 'ON'){
                $this.html('OFF');
                SMART_INDENT = false;
            }else{
                $this.html('ON');
                SMART_INDENT = true;
            }
        }
        if($this.attr('id') === 'number'){
            if($this.html() === 'ON'){
                $this.html('OFF');
                SHOW_LINE_NUMBER = false;
            }else{
                $this.html('ON');
                SHOW_LINE_NUMBER = true;
            }
        }
        if (IS_SHOW_COLOR_CODE === true){
            colorIt();
        };
    });

    //==============custom lang input event===============
    CUSTOMLANGENTER = function(){
        if ($.trim($('#custom_lang_input').val()).length > 0){
            setSelectedLanguage($('#custom_lang_input').val());
            $('#choose_lang_box').hide();
            choose_lang_box_toggle_hook();
            if( (($('#black_code_box').attr('firstfocus') === 'false') || ($.trim($('#black_code_box').val().length===0))).toString() === 'false' ){
                colorIt();
            }
        }else{
            $('#custom_lang_input').css('color','gray').attr('firstfocus','false').css('text-align','center').val('or input your suffix/language');
            $('#choose_lang').focus();
        };
    };

    $('#custom_lang_input').focus(function(){
        if ($(this).attr('firstfocus') === 'false'){
            $(this).css('color','#000;').attr('firstfocus','true').css('text-align','left').val('');
        };
        $('#lang_input_tip').css('visibility','visible');
    }).blur(function(){
        if ($.trim($(this).val()) === ''){
            $(this).css('color','gray').attr('firstfocus','false').css('text-align','center').val('or input your suffix/language');
        };
        $('#lang_input_tip').css('visibility','hidden');
    }).keypress(function(event){
        if(event.keyCode==13) {
            CUSTOMLANGENTER();
            return false;
        };
    });
    $('#custom_lang_input').css('color','gray').attr('firstfocus','false').css('text-align','center').val('or input your suffix/language');

    //==============black_code_box input event===============
    IS_BLACK_CODE_BOX_BLUR = false;
    $('#black_code_box').focus(function(){
        if ($(this).attr('firstfocus') === 'false'){
            $(this).attr('firstfocus','true').css('font-size','14px').val('');
        };
    }).blur(function(){
        if ($(this).val() === ''){
            $(this).attr('firstfocus','false').css('font-size','24px').val('Input your code and color it!\n');
        };
        IS_BLACK_CODE_BOX_BLUR = true;
        setTimeout(function(){IS_BLACK_CODE_BOX_BLUR = false;}, 100);
    });
    $('#black_code_box').attr('firstfocus','false').css('font-size','24px').val('Input your code and color it!\n');

    //==============turn font size event===============
    $('#turn_font_down, #turn_font_up').click(function(){
        var turn_value = parseInt($(this).attr('turn_value'));
        var new_size = FONT_SIZE + turn_value;
        if (new_size<12 || new_size>24) {
            return;
        };
        FONT_SIZE  = new_size;
        $('#color_code_box > div > code').css('font-size', FONT_SIZE+'px');
        $('#show_font_size').html(FONT_SIZE+'px');
        $('#code_box').height(Math.max($('#black_code_box').height(), $('#color_code_box').height())+40);
        CLIPBOARD.setText( $('#color_code_box').html() );
    });

    //==============布局===============
    var client_x = document.documentElement.clientWidth;
    var client_y = document.documentElement.clientHeight;
    var code_box_width = client_x-90-126-200;
    $('#code_box').width(code_box_width);
    $('#cc_top').width(code_box_width+20);
    $('#code_box').animate({opacity:0.8});
    $('#black_code_box, #color_code_box').width(code_box_width-40).animate({opacity:1});
    $('#choose_lang_box').animate({opacity:0.8});
    $('#color_code_loading_overlay').width($('#black_code_box').width()+40).height($('#black_code_box').height()+40);
    $('#tool_box, #cc_sub_logo').animate({opacity:0.85});

    //==============google adsense===========
    google_ad_client = "ca-pub-3733795682230399";
    google_ad_slot = "4237546774";
    google_ad_width = 125;
    google_ad_height = 125;
    $('body > ins').appendTo($('#ad_sense'));

});

