$(function(){
    test = function(){
        data = {code:$('#blackcode').val()};
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#showcolorcode').html(cc);
        },'text');
    }
});
