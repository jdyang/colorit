$(function(){

    test = function(){
        data = {code:$('#blackcode').val(), type:'py'};
        $.post('/zarkapi/getcolorcode',data,function(cc){
            $('#showcolorcode').html(cc);
        },'text');
    };

});
