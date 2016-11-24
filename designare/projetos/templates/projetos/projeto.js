function SelecionarRecurso(id_atividade){
    $("#id-atividade").val(id_atividade);
    $("#modal-adicionar-recurso").modal('show');

}
function AdicionarRecurso(id_recurso){
    id_projeto = $("#id-projeto").val();
    id_atividade = $("#id-atividade").val();
    endereco = "/projetos/"+id_projeto+"/atividade/"+id_atividade+"/adicionar-recurso/"+id_recurso+"/";
    $.ajax({
        type    : "POST",
        url     : endereco,
        data    : { 'csrfmiddlewaretoken' : document.info.csrfmiddlewaretoken.value,
                },
        dataType: "json",
        encode  : true,

        beforeSend: function(){
            //$('#btn-nova-metodologia').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
        },
        success: function(data){
            //Cria um log da data recebida no console
            console.log(data);
            //Verifica se a operação foi bem sucedida
            $('#btn-nova-metodologia').html("<i class='fa fa-check'></i>");
            if(data.sucesso)
            {
                $("#atividade-"+id_atividade+"-recursos").append(data.template);
                //$("#editor").wysiwyg();
                $("#modal-adicionar-recurso").modal('hide');                      
            }
        }
    });
}