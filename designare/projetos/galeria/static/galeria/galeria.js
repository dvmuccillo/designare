function GaleriaAtivacao(argumentos){
    endereco = "/galeria/"+argumentos.execucao_id+"/nova/";
    $.ajax({
        type    : "POST",
        url     : endereco,
        data    : { 'csrfmiddlewaretoken' : document.info.csrfmiddlewaretoken.value },
        dataType: "json",
        encode  : true,

        beforeSend: function(){
            //do nothing :)
        },
        success: function(data){
            //Cria um log da data recebida no console
            console.log(data);
            //Verifica se a operação foi bem sucedida
            if(data.sucesso)
            {
                //do nothing 2.0 :)                    
            }
        }
    });
}
function GaleriaAdicionarImagem(execucao_id){
    $("#input-fotos").fileinput({
        language: "pt-BR",
        action: "./",
        uploadAsync: true,
        maxFileCount: 5,
        showUpload: false,
        showRemove: false,
        autoReplace: true,
    });
    $("#modal-galeria").modal('show');
    //$("#galeria-"+execucao_id+"-aviso").collapse('hide');    
}