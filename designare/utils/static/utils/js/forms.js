;Designare.Utils.Forms = {
    /* Atualiza elementos de feedback de input */
    InputStateUpdate: function(input,state,toggle){
        base_id = input.attr('id');
        $("#"+base_id+"-group").toggleClass('has-'+state,toggle);
        input.toggleClass('form-control-'+state,toggle);
    },
}