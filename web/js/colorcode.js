$(function(){

    test = function(){
        data = {code:$('#black_code_box').val(), type:'py'};
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#black_code_box').hide();
            $('#color_code_box').html(cc).show();
        },'text');
    };

    ZeroClipboard.setMoviePath( '/swf/ZeroClipboard.swf' );
    var clip = new ZeroClipboard.Client();
    clip.setText( "Copy me!" );
    clip.setHandCursor( true )
    clip.glue( 'd_clip_button', 'd_clip_container' );

    clip.setText( "Copy me2!" );

});
