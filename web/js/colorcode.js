$(function(){

    //==============zeroclipboard init ===============
    ZeroClipboard.setMoviePath( '/swf/ZeroClipboard.swf' );
    CLIPBOARD = new ZeroClipboard.Client();
    CLIPBOARD.setHandCursor( true )
    CLIPBOARD.glue( 'd_clip_button', 'd_clip_container' );

    //==============language select===============
    SELECTED_LANG = null;
    $('#type_selector').change(function(){
        if($('#type_selector').val() != ''){
            $('#color_it').removeClass('btn_color_forbid').addClass('btn_color_free ');
            SELECTED_LANG = $('#type_selector').val();
        }else{
            $('#color_it').removeClass('btn_color_free ').addClass('btn_color_forbid');
        }
    });

    //==============color it function===============
    colorIt = function(){
        var options = '';
        //if($('#format').selected());
        data = {code:$('#black_code_box').val(), type:SELECTED_LANG, options:options  };
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#black_code_box').hide();
            $('#color_code_box').html(cc).show();
            $('#code_box').height(Math.max($('#black_code_box').height(),$('#color_code_box').height())+40);
            CLIPBOARD.setText( $('#color_code_box').html() );
        },'text');
        $('#color_it').html('clean');
        IS_SHOW_COLOR_CODE = true;
    }

    //==============clean code function===============
    IS_SHOW_COLOR_CODE = false;
    cleanCode = function(){
        $('#black_code_box').val('').show();
        $('#color_code_box').html('').hide();
        $('#color_it').html('color it');
        IS_SHOW_COLOR_CODE = false;
    };

    //==============color it button===============
    $('#color_it').click(function(){
        if (IS_SHOW_COLOR_CODE === false){
            if (SELECTED_LANG !== null){
                colorIt();
            }else{
                $('#choose_lang_box').toggle();
            }
        }else{
            cleanCode();
        }
    });

    //==============choose language button===============
    $('#choose_lang').click(function(){
        $('#choose_lang_box').toggle();
    });

    //==============choose language box===============
    $('#choose_lang_box li').click(function(){
        SELECTED_LANG = $(this).attr('val');
        colorIt();
        $('#choose_lang_box').hide();
    });

    //==============布局===============
    var client_x = document.documentElement.clientWidth;
    var client_y = document.documentElement.clientHeight;
    var code_box_width = client_x-90-126-200;
    $('#code_box, #cc_top').width(code_box_width);
    $('#black_code_box, #color_code_box').width(code_box_width-40);
    $('#choose_lang_box').animate({opacity:0.8});

});
