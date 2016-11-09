$(document).ready(function(){
    $("#btn-novo-projeto").click(function(){
       $("#div-btn-form-projeto").collapse('toggle');
       $("#btn-cancelar-novo-projeto").toggleClass('hidden',false);
       $("#btn-adicionar-novo-projeto").toggleClass('hidden',false);
    });
    
    $("#btn-cancelar-novo-projeto").click(function(){
        /* Limpa estilos de erro */
        $('#div-input-projeto-nome').toggleClass('has-danger',false);
        $('#input-projeto-nome').toggleClass('form-control-danger',false);
        $('#div-projeto-nome-txt').toggleClass('invisible',true);
        /* Limpa campos */
        document.getElementById("form-novo-projeto").reset();
        /* Exibe linha (row) do botão de adicionar novo projeto */ 
        $("#div-btn-form-projeto").collapse('toggle');
    });

    $("#btn-adicionar-novo-projeto").click(function(){
        $('#div-input-projeto-nome').toggleClass('has-danger',false);
        $('#input-projeto-nome').toggleClass('form-control-danger',false);
        $('#div-projeto-nome-txt').toggleClass('invisible',true);
        if($('#input-projeto-nome').val() == ""){
            $('#div-input-projeto-nome').toggleClass('has-danger',true);
            $('#input-projeto-nome').toggleClass('form-control-danger',true);
            $('#div-projeto-nome-txt').toggleClass('invisible',false);
        }
        else{
            $("#form-novo-projeto").submit();
        }
    });
});
function ExcluirProjeto(id_projeto){
    $("#btn-excluir-projeto-"+id_projeto).tooltip('hide');
    PreencheExcluirProjeto(id_projeto)
    $("#modal-info").toggleClass('in', false);
    $("#modal-editar").toggleClass('in',false);
    $("#modal-excluir").toggleClass('in',true);
    $("#modal-acoes").modal('show');        
}
function PreencheInfoProjeto(id_projeto){
    $("#modal-info-projeto-capa").attr("src",$("#projeto-capa-"+id_projeto).attr("src"));
    $("#modal-info-projeto-nome").html($("#projeto-nome-"+id_projeto).html());
    if($("#projeto-descricao-"+id_projeto).html() == ""){
        descricao = "<i>Nenhuma descrição informada!</i>";
    }
    else descricao = $("#projeto-descricao-"+id_projeto).html();
    $("#modal-info-projeto-descricao").html(descricao);
    if($("#projeto-metodologia-"+id_projeto).html() == ""){
        metodologia = "<i>Nenhuma metodologia foi atribuida para este projeto ainda!</i>";
    }
    else metodologia = $("#projeto-metodologia-"+id_projeto).html();
    $("#modal-info-projeto-metodologia").html(metodologia);
    $("#btn-info-excluir").attr("onclick", "InfoProjetoExcluir('"+id_projeto+"');");
    $("#btn-info-editar").attr("onclick", "InfoProjetoEditar('"+id_projeto+"');");   
}
function PreencheEditarProjeto(id_projeto){
    $("#input-editar-nome").val($("#projeto-nome-"+id_projeto).html());
    $("#input-editar-descricao").val($("#projeto-descricao-"+id_projeto).html());
    if($("#projeto-metodologia-id-"+id_projeto).html() == ""){
        id_metodologia = 0;
    } else id_metodologia = $("#projeto-metodologia-id-"+id_projeto).html();
    $("#select-metodologia-editar").val(id_metodologia);
    $("#form-editar-projeto").attr("action","/projetos/"+id_projeto+"/atualizar-projeto/");
    $("#btn-editar-info").attr("onclick", "EditarProjetoInfo('"+id_projeto+"');");
    $("#btn-atualizar-projeto").attr("onclick", "AtualizarProjeto('"+id_projeto+"');");
}
function PreencheExcluirProjeto(id_projeto){
    $("#modal-excluir-projeto-nome").html($("#projeto-nome-"+id_projeto).html());
    $("#btn-excluir-projeto").attr("href", "/projetos/"+id_projeto+"/excluir-projeto/");
    $("#btn-excluir-info").attr("onclick", "ExcluirProjetoInfo('"+id_projeto+"');");
}
function InfoProjeto(id_projeto){
    $("#btn-info-projeto-"+id_projeto).tooltip('hide');
    PreencheInfoProjeto(id_projeto);
    $("#modal-excluir").toggleClass('in', false);
    $("#modal-info").toggleClass('in',true);
    $("#modal-editar").toggleClass('in',false);
    $("#modal-acoes").modal('show');
}
function InfoProjetoEditar(id_projeto){
    PreencheEditarProjeto(id_projeto);
    $("#modal-info").toggleClass('in', false);
    $("#modal-editar").toggleClass('in', true);
}
function InfoProjetoExcluir(id_projeto){
    PreencheExcluirProjeto(id_projeto);
    $("#modal-info").toggleClass('in', false);
    $("#modal-excluir").toggleClass('in', true);
}
function ExcluirProjetoInfo(id_projeto){
    PreencheInfoProjeto(id_projeto);
    $("#modal-excluir").toggleClass('in', false);
    $("#modal-info").toggleClass('in', true);
}
function EditarProjeto(id_projeto){
    $("#btn-editar-projeto-"+id_projeto).tooltip('hide');
    PreencheEditarProjeto(id_projeto);
    $("#modal-excluir").toggleClass('in', false);
    $("#modal-info").toggleClass('in',false);
    $("#modal-editar").toggleClass('in',true);
    $("#modal-acoes").modal('show');
}
function EditarProjetoInfo(id_projeto){
    PreencheInfoProjeto(id_projeto);
    $("#modal-excluir").toggleClass('in', false);
    $("#modal-editar").toggleClass('in',false);
    $("#modal-info").toggleClass('in',true);
}
function AtualizarProjeto(id_projeto){
    $('#div-input-editar-nome').toggleClass('has-danger',false);
        $('#input-editar-nome').toggleClass('form-control-danger',false);
        $('#div-editar-nome-txt').toggleClass('invisible',true);
        if($('#input-editar-nome').val() == ""){
            $('#div-input-editar-nome').toggleClass('has-danger',true);
            $('#input-editar-nome').toggleClass('form-control-danger',true);
            $('#div-editar-nome-txt').toggleClass('invisible',false);
        }
        else{
            $("#form-editar-projeto").submit();
        }
}