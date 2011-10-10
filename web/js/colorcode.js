$(function(){

    test = function(){
        data = {code:$('#blackcode').val(), type:'py'};
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#showcolorcode').html(cc);
        },'text');
    };

    $.clipboardReady(function(){
        $("#copy").click(function(){
            $.clipboard( "You clicked on a link and copied this text!" );
            return false;
        });
    }, { swfpath: "/swf/jquery.clipboard.swf"} );

});
