/* script de inicialização do editor ao carregar o recurso por ajax */
function EditorAtivacao(argumentos){
    $("#editor-"+argumentos.execucao_id).wysiwyg({ toolbarSelector: "[data-role='editor-"+argumentos.execucao_id+"-toolbar']" });
}
/* fim do script de inicialização do editor */
function EditorSalvar(execucao_id){
    conteudo = $("#editor-"+execucao_id).html();
    if (conteudo.trim() == "") { 
        alert("Nada a salvar!");
    }else{
        endereco = "/editor/"+execucao_id+"/salvar/";
        $.ajax({
            type    : "POST",
            url     : endereco,
            data    : { 'conteudo' : conteudo,'csrfmiddlewaretoken' : document.info.csrfmiddlewaretoken.value,
                    },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $('#btn-editor-'+execucao_id+'-salvar').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                $('#btn-editor-'+execucao_id+'-salvar').html("<i class='fa fa-check'></i> Salvar");
                if(data.sucesso)
                {
                    $("#editor-"+execucao_id+"-conteudo").html(conteudo);
                    $("#editor-"+execucao_id+"-edicao").collapse('toggle');
                    $("#editor-"+execucao_id+"-exibicao").collapse('toggle');                      
                }
            }
        });
    }
}
function EditorEditar(execucao_id){
    conteudo = $("#editor-"+execucao_id+"-conteudo").html();
    $("#editor-"+execucao_id).html(conteudo);
    $("#editor-"+execucao_id+"-exibicao").collapse('toggle');
    $("#editor-"+execucao_id+"-edicao").collapse('toggle');
}
function EditorCancelar(execucao_id){
    conteudo = $("#editor-"+execucao_id).html();
    if (conteudo.trim() == "") { 
        alert("Nada a cancelar!");
    } else {
        $("#editor-"+execucao_id+"-edicao").collapse('toggle');
        $("#editor-"+execucao_id+"-exibicao").collapse('toggle');
    }
}