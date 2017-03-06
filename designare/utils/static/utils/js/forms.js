;Designare.Utils.Forms = {
    /* Atualiza elementos de feedback de input */
    InputStateUpdate: function(input,state/*,toggle*/){
        base_id = input.attr('id');
        if(state == 'clear'){
            $("#"+base_id+"-group").removeClass('has-success has-warning has-danger');
            input.removeClass('form-control-success form-control-warning form-control-danger');
        }else{
            $("#"+base_id+"-group").toggleClass('has-'+state,toggle);
            input.toggleClass('form-control-'+state,toggle);
        }        
    },
}