$(function(){

    //==============language select===============
    COLOR_IT_IS_READY = false;
    $('#type_selector').change(function(){
        if($('#type_selector').val() != ''){
            $('#color_it').removeClass('btn_color_forbid').addClass('btn_color_free ');
            COLOR_IT_IS_READY = true;
        }else{
            $('#color_it').removeClass('btn_color_free ').addClass('btn_color_forbid');
        }
    });

    //==============color it button===============
    $('#color_it').click(function(){
        if (COLOR_IT_IS_READY === true){
            data = {code:$('#black_code_box').val(), type:'py'};
            $.post('/zarkapi/getcolorcode',data,function(cc){
                $('#black_code_box').hide();
                $('#color_code_box').html(cc).show();
            },'text');
        }
    });


    //==============copy it button===============
    ZeroClipboard.setMoviePath( '/swf/ZeroClipboard.swf' );
    var clip = new ZeroClipboard.Client();
    clip.setText( "Copy me!" );
    clip.setHandCursor( true )
    clip.glue( 'd_clip_button', 'd_clip_container' );
    clip.setText( "Copy me2!" );

});
