/* script de inicialização dos editores ao carregar a página*/
$(function(){
    $('div[data-toggle="designare-editor"]').each(function(index,value){
        var editor_id = $(this).attr('id');
        $(this).wysiwyg({ toolbarSelector: "[data-role='"+editor_id+"-toolbar']" });
        if(($("#"+editor_id+"-conteudo").html()).trim() != ""){
            $("#"+editor_id+"-edicao").collapse('toggle');
            $("#"+editor_id+"-toolbar-editor").collapse('toggle');
            $("#"+editor_id+"-exibicao").collapse('toggle');
            $("#"+editor_id+"-toolbar-exibicao").collapse('toggle');
        }
    });
});
/* fim do script de inicialização dos editores */