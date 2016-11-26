/* script de inicialização do editor ao carregar o recurso por ajax */
function EditorAtivacao(argumentos){
    $("#editor-"+argumentos.execucao_id).wysiwyg({ toolbarSelector: "[data-role='editor-"+argumentos.execucao_id+"-toolbar']" });
}
/* fim do script de inicialização do editor */
function EditorSalvar(execucao_id){
    var editor_id = "editor-"+ execucao_id;
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
                $('#btn-editor-'+execucao_id+'-salvar').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                $('#btn-editor-'+execucao_id+'-salvar').html("<i class='fa fa-save'></i>");
                if(data.sucesso)
                {
                    $("#editor-"+execucao_id+"-conteudo").html(conteudo);
                    $("#"+editor_id+"-edicao").collapse('toggle');
                    $("#"+editor_id+"-toolbar-editor").collapse('toggle');
                    $("#"+editor_id+"-exibicao").collapse('toggle');
                    $("#"+editor_id+"-toolbar-exibicao").collapse('toggle');                      
                }
            }
        });
    }
}
function EditorEditar(execucao_id){
    var editor_id = "editor-"+ execucao_id;
    conteudo = $("#editor-"+execucao_id+"-conteudo").html();
    $("#editor-"+execucao_id).html(conteudo);
    $("#"+editor_id+"-edicao").collapse('toggle');
    $("#"+editor_id+"-toolbar-editor").collapse('toggle');
    $("#"+editor_id+"-exibicao").collapse('toggle');
    $("#"+editor_id+"-toolbar-exibicao").collapse('toggle');;
}
function EditorCancelar(execucao_id){
    var editor_id = "editor-"+ execucao_id;
    conteudo = $("#editor-"+execucao_id).html();
    if (conteudo.trim() == "") { 
        alert("Nada a cancelar!");
    } else {
        $("#"+editor_id+"-edicao").collapse('toggle');
        $("#"+editor_id+"-toolbar-editor").collapse('toggle');
        $("#"+editor_id+"-exibicao").collapse('toggle');
        $("#"+editor_id+"-toolbar-exibicao").collapse('toggle');
    }
}