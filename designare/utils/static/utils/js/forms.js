;Designare.Utils.Forms = {
    /* Atualiza elementos de feedback de input */
    InputStateUpdate: function(input,state){
        base_id = input.attr('id');
        if(state == 'clear'){
            $("#"+base_id+"-group").removeClass('has-success has-warning has-danger');
            input.removeClass('form-control-success form-control-warning form-control-danger');
        }else{
            $("#"+base_id+"-group").addClass('has-'+state);
            input.addClass('form-control-'+state);
        }        
    },
    /* Verifica campo vazio */
    InputIsEmpty: function(input){
        return($.trim(input.val()).length == 0);
    }
}