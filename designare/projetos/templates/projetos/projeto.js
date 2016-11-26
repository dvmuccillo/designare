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
                var fn = JSON.parse(data.function);
                console.log(fn);
                if(fn.ativacao){
                    InicializaRecurso(fn.nome, fn.argumentos);
                }                   
            }
        }
    });
}

function executeFunctionByName(functionName, context /*, args */) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}
/*
    InicializaRecurso
        -funcao: nome da função de ativação do recurso
        -argumentos: atualmente o id da execucao, necessário adaptar depois para receber objetos json como argumento,
        exige mudanças no backend 
*/
function InicializaRecurso(funcao, argumentos){
    executeFunctionByName(funcao, window, argumentos);
}

function ExcluirRecurso(projeto_id,atividade_id,execucao_id){
    aviso = "Deseja realmente excluir esse recurso?";
    if(confirm(aviso)){
        endereco = "/projetos/"+projeto_id+"/atividade/"+atividade_id+"/excluir-recurso/"+execucao_id+"/";
        $.ajax({
            type    : "POST",
            url     : endereco,
            data    : { 'csrfmiddlewaretoken' : document.info.csrfmiddlewaretoken.value,
                    },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $('#btn-execucao-'+execucao_id+'-excluir').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                if(data.sucesso)
                {
                    $('#btn-execucao-'+execucao_id+'-excluir').tooltip('dispose');
                    $("#execucao-"+execucao_id).collapse('toggle');                      
                }
            }
        });
    }
}