$(function(){

    test = function(){
        data = {code:$('#blackcode').val(), type:'py'};
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#showcolorcode').html(cc);
        },'text');
    };

    ZeroClipboard.setMoviePath( '/swf/ZeroClipboard.swf' );
    var clip = new ZeroClipboard.Client();
    clip.setText( "Copy me!" );
    clip.setHandCursor( true )
    clip.glue( 'd_clip_button', 'd_clip_container' );

    clip.setText( "Copy me2!" );

});
