/* script de inicialização das galerias ao carregar a página*/
$(function(){
    $('input[id^="input-fotos-"]').each(function(index,value){
        var execucao_id = $(this).attr('data-execucao');
        GaleriaInicializacao(execucao_id);
        if(($("#galeria-"+execucao_id).html()).trim() != ""){
            $('#galeria-input-'+execucao_id).collapse('hide');
            $('#galeria-'+execucao_id+'-toolbar-upload').collapse('hide');
            $('#galeria-'+execucao_id+'-toolbar-exibicao').collapse('show');    
        }
    });
});
/* fim do script de inicialização das galerias */