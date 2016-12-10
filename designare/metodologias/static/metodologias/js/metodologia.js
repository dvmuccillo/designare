$(document).ready(function(){
    /* Verifica se metodologia tem nome definido */
    if($("#div-metodologia-nome").hasClass("hidden")){
        /* Se metodologia não tem nome definido (não existe)*/
        $("#div-row-info").toggleClass("hidden",false);
        $("#div-row-etapas").toggleClass("hidden",true);
        /* Desabilita o formulário de cadastro de etapas */
        $("#fieldset-nova-etapa").prop("disabled",true)
        /* Requisita foco para o campo de nome da metodologia */
        $("#input-metodologia-nome").focus();
        /* Exibe tooltip do campo */
        $("#input-metodologia-nome").tooltip('show');
    }
    /* Previne a submissão do formulário */
    $("#form-metodologia").submit(function(){
        event.preventDefault();
    });

    /* Exibe o formulário de cadastro de etapas se não houverem etapas cadastradas */
    if((($("#div-menu-etapas").children().length) == 1)){
        $("#collapse-cadastrar-etapa").toggleClass('in',true);
    }

    /* Ação de cadastro de metodologia (definição do nome) */
    $("#btn-nova-metodologia").click(function(){
        event.preventDefault();
        $("#div-input-metodologia-nome").toggleClass("has-danger",false);
        $("#input-metodologia-nome").toggleClass("form-control-danger",false);
        nome = $("#input-metodologia-nome").val();
        idm = $("#input-metodologia-id").val();
        if (idm == "") {
            endereco = "/metodologias/nova/cadastrar-metodologia/";
        } else {
            endereco = "/metodologias/" + idm + "/atualizar-nome/";
        }
        if(!nome){
            $("#div-input-metodologia-nome").toggleClass("has-danger",true);
            $("#input-metodologia-nome").toggleClass("form-control-danger",true);
        }
        else {
            /* Realiza a requisição ajax para cadastro */
            $.ajax({
                type    : "POST",
                url     : endereco,
                data    : { 'nome' : nome,
                            'csrfmiddlewaretoken' : document.form_metodologia.csrfmiddlewaretoken.value,
                        },
                dataType: "json",
                encode  : true,

                beforeSend: function(){
                    $('#btn-nova-metodologia').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
                },
                success: function(data){
                    //Cria um log da data recebida no console
                    console.log(data);
                    //Verifica se a operação foi bem sucedida
                    $('#btn-nova-metodologia').html("<i class='fa fa-check'></i>");
                    if(data.sucesso)
                    {
                        $("#input-metodologia-id").val(data.metodologia_id);
                        $("#metodologia-nome").empty();
                        $("#metodologia-nome").append(nome);
                        $("#div-form-metodologia").toggleClass("hidden",true);
                        $("#div-metodologia-nome").toggleClass("hidden",false);
                        $("#div-row-info").toggleClass("hidden",true);
                        $("#div-row-etapas").toggleClass("hidden",false);
                        /* Habilita o formulário de cadastro de etapas */
                        $("#fieldset-nova-etapa").prop("disabled",false)
                        if(idm == ""){window.history.replaceState(null, null, "/metodologias/"+data.metodologia_id+"/")};                       
                    }
                }
            });
        }
    });

    /* Ação de edição de metodologia */
    $("#btn-edit-metodologia").click(function(){
        $("#div-metodologia-nome").toggleClass("hidden",true);
        $("#div-form-metodologia").toggleClass("hidden",false);
        /* Requisita foco para o campo de nome da metodologia */
        $("#input-metodologia-nome").focus();
        /* Exibe tooltip do campo */
        $("#input-metodologia-nome").tooltip('show');
    });

    /* Ação de cancelar edição ou cadastro de metodologia */
    $("#btn-cancela-metodologia").click(function(){
        if($("#input-metodologia-id").val() == ""){
            $(window.document.location).attr('href','/metodologias/');
        } else {
            $("#div-form-metodologia").toggleClass("hidden",true);
            $("#div-metodologia-nome").toggleClass("hidden",false);
        }
    });

      
    $("#li-menu-adicionar-etapa").click(function(){
        event.preventDefault();
        if(!$("#collapse-cadastrar-etapa").hasClass("in")){
            $("#collapse-cadastrar-etapa").collapse('toggle');
            $('html, body').animate({
                scrollTop: $("#collapse-cadastrar-etapa").offset().top
            }, 1000);
        }        
    });
    
    /* Ação de Cadastro de Etapa */
    $("#btn-nova-etapa").click(function(){
        /* Limpeza de estilos de validação */
        $("#div-input-etapa-nome").toggleClass("has-danger",false);
        $("#input-etapa-nome").toggleClass("form-control-danger",false);
        $("#div-etapa-nome-feedback").empty();
        /* Valor das propriedades de etapa */
        nome = $("#input-etapa-nome").val();
        descricao = $("#input-etapa-descricao").html();
        idm = $("#input-metodologia-id").val();
        endereco = "/metodologias/" + idm + "/cadastrar-etapa/";
        /* Verifica se o nome da etapa foi informado */
        if(!nome){
            /* Aplica estilos de aviso se o nome da etapa não foi informado */
            $("#div-input-etapa-nome").toggleClass("has-danger",true);
            $("#input-etapa-nome").toggleClass("form-control-danger",true);
            $("#div-etapa-nome-feedback").append("Informe o nome da etapa!");
        } else {
            /* Realiza a requisição ajax para cadastro */
            $.ajax({
                type    : "POST",
                url     : endereco,
                data    : { 'nome' : nome,
                            'descricao' : descricao, 
                            'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value,
                        },
                dataType: "json",
                encode  : true,

                beforeSend: function(){
                    $('#btn-nova-etapa').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
                },
                success: function(data){
                    //Cria um log da data recebida no console
                    console.log(data);
                    //Verifica se a operação foi bem sucedida
                    $('#btn-nova-etapa').html("Cadastrar Etapa");
                    if(data.sucesso)
                    {
                        ide = data.etapa_id;
                        if(descricao==""){
                            descricao = "<i>Nenhuma descrição fornecida para esta etapa!</i>";
                        }
                        /* Elemento HTML que representa o menu com link interno para etapa */
                        link_etapa = "<a href='#etapa_"+ide+"' class='list-group-item list-group-item-action' id='li-menu-etapa-"+ide+"'>"+nome+"</a>";
                        /* Limpa os campos do formulário de cadastro de etapas */
                        $("#input-etapa-nome").val("");
                        $("#input-etapa-descricao").val("");
                        /* Insere os elementos HTML no corpo */
                        $("#div-listagem-etapas").append(data.template);
                        //$("#div-menu-etapas").append(link_etapa);
                        $(link_etapa).insertBefore("#li-menu-adicionar-etapa")
                        $("#collapse-cadastrar-etapa").collapse('toggle');
                        /*
                        $("#li-menu-etapa-"+nome).on("click",function(){
                            //event.preventDefault();
                            //id = nome;
                            //alert(id);
                            //$('html, body').animate({
                            //    scrollTop: $("#"+nome).offset().top
                            //}, 1000);
                        });
                        */                                               
                    }
                }
            });
        }
    });

    /* Ação de cancelar cadastro de etapa */
    $("#btn-cancelar-etapa").click(function(){
        /* Limpeza do valor de campos */
        $("#input-etapa-nome").val("");
        $("#input-etapa-descricao").val("");
        /* Limpeza de estilos de validação */
        $("#div-input-etapa-nome").toggleClass("has-danger",false);
        $("#input-etapa-nome").toggleClass("form-control-danger",false);
        $("#div-etapa-nome-feedback").empty();
        /* Fecha o collapse */
        $("#collapse-cadastrar-etapa").collapse('toggle');
    });
});
/* Ação de Cadastrar Atividade */
function CadastrarAtividade(id_etapa){
    /* Limpeza de estilos de validação */
    $("#div-input-atividade-nome" + id_etapa).toggleClass("has-danger",false);
    $("#input-atividade-nome" + id_etapa).toggleClass("form-control-danger",false);
    $("#div-atividade-" + id_etapa + "-nome-feedback").empty();
    /* Valor das propriedades de etapa */
    nome = $("#input-atividade-nome" + id_etapa).val();
    descricao = $("#input-atividade-descricao" + id_etapa).val();
    idm = $("#input-metodologia-id").val();
    endereco = "/metodologias/" + idm + "/etapa/" + id_etapa + "/cadastrar-atividade/";
    /* Verifica se o nome da atividade foi informado */
    if(!nome){
        /* Aplica estilos de aviso se o nome da etapa não foi informado */
        $("#div-input-atividade-nome" + id_etapa).toggleClass("has-danger",true);
        $("#input-atividade-nome" + id_etapa).toggleClass("form-control-danger",true);
        $("#div-atividade-" + id_etapa + "-nome-feedback").append("Informe o nome da atividade!");
    } else {
        /* Realiza a requisição ajax para cadastro */
        $.ajax({
            type    : "POST",
            url     : endereco,
            data    : { 'nome' : nome,
                        'descricao' : descricao, 
                        'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value,
                    },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $('#btn-nova-atividade' + id_etapa).html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                $('#btn-nova-atividade' + id_etapa).html("Cadastrar Atividade");
                if(data.sucesso)
                {
                    ide = data.atividade_id;
                    if(descricao==""){
                        descricao = "<i>Nenhuma descrição fornecida para esta atividade!</i>";
                    }
                    /* Limpa os campos do formulário de cadastro de etapas */
                    $("#input-atividade-nome" + id_etapa).val("");
                    $("#input-atividade-descricao" + id_etapa).val("");
                    $("#row-nenhuma-etapa-aviso-" + id_etapa).collapse('toggle');
                    /* Insere os elementos HTML no corpo */
                    //$("#div-listagem-atividades" + id_etapa).append("div_atividade");
                    $(data.template).insertBefore("#row-btn-nova-atividade" + id_etapa);
                    $("#CadastrarAtividade" + id_etapa).collapse('toggle');
                    $("#row-btn-nova-atividade" + id_etapa).collapse('toggle');
                }
            }
        });
    }
}
/* Ação de Cancelar Cadastro de Atividade */
function CancelarCadastrarAtividade(id_etapa){
    /* Limpeza de campos */
    $("#input-atividade-nome" + id_etapa).val("");
    $("#input-atividade-descricao" + id_etapa).val("");
    /* Limpeza de estilos de validação */
    $("#div-input-atividade-nome" + id_etapa).toggleClass("has-danger",false);
    $("#input-atividade-nome" + id_etapa).toggleClass("form-control-danger",false);
    $("#div-atividade-" + id_etapa + "-nome-feedback").empty();
    /* Esconde Formulário de Cadastro de Atividade */
    $("#CadastrarAtividade" + id_etapa).collapse('toggle');
    /* Exibe Linha (row) de botão 'Adicionar nova atividade' */
    $("#row-btn-nova-atividade" + id_etapa).collapse('toggle'); 
}
function EsconderBtnNovaAtividade(id_etapa){
    /* Esconde Linha (row) de botão 'Adicionar nova atividade' */
    $("#row-btn-nova-atividade" + id_etapa).collapse('toggle');
}
/* Ações de Edição de Etapa */
function EditarEtapa(id_etapa){
    $("#input-etapa-nome-"+id_etapa).val($("#etapa-nome-"+id_etapa).html());
    if($("#etapa-descricao-"+id_etapa).html() == "<i>Nenhuma descrição fornecida para esta etapa!</i>"){
        $("#input-etapa-descricao-"+id_etapa).html("");
    } else {
        $("#input-etapa-descricao-"+id_etapa).html($("#etapa-descricao-"+id_etapa).html());
    }
    $("#btn-edit-etapa-"+id_etapa).tooltip('hide');
    $("#card-etapa-info-"+id_etapa).collapse('toggle');
    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
    $("#card-etapa-editar-"+id_etapa).collapse('toggle');
}
function CancelarEditarEtapa(id_etapa){
    /* Limpeza do valor de campos */
    $("#input-etapa-nome-"+id_etapa).val("");
    $("#input-etapa-descricao-"+id_etapa).html("");
    /* Limpeza de estilos de validação */
    $("#div-input-etapa-nome-"+id_etapa).toggleClass("has-danger",false);
    $("#input-etapa-nome-"+id_etapa).toggleClass("form-control-danger",false);
    $("#div-etapa-nome-feedback-"+id_etapa).empty();
    /* Fecha o collapse */
    $("#card-etapa-info-"+id_etapa).collapse('toggle');
    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
    $("#card-etapa-editar-"+id_etapa).collapse('toggle');
}
function EnviarEditarEtapa(id_etapa){
    /* Limpeza de estilos de validação */
    $("#div-input-etapa-nome-"+id_etapa).toggleClass("has-danger",false);
    $("#input-etapa-nome-"+id_etapa).toggleClass("form-control-danger",false);
    $("#div-etapa-nome-feedback-"+id_etapa).empty();
    /* Valor das propriedades de etapa */
    nome = $("#input-etapa-nome-"+id_etapa).val();
    descricao = $("#input-etapa-descricao-"+id_etapa).html();
    idm = $("#input-metodologia-id").val();
    endereco = "/metodologias/" + idm + "/etapa/" +id_etapa + "/atualizar-etapa/";
    /* Verifica se o nome da etapa foi informado */
    if(!nome){
        /* Aplica estilos de aviso se o nome da etapa não foi informado */
        $("#div-input-etapa-nome-"+id_etapa).toggleClass("has-danger",true);
        $("#input-etapa-nome-"+id_etapa).toggleClass("form-control-danger",true);
        $("#div-etapa-nome-feedback-"+id_etapa).append("Informe o nome da etapa!");
    } else {
        /* Realiza a requisição ajax para cadastro */
        $.ajax({
            type    : "POST",
            url     : endereco,
            data    : { 'nome' : nome,
                        'descricao' : descricao, 
                        'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value,
                    },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $("#fieldset-editar-etapa-" + id_etapa).prop("disabled",true);
                $('#btn-nova-etapa-'+id_etapa).html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                $('#btn-nova-etapa-'+id_etapa).html("Atualizar");
                if(data.sucesso)
                {
                    ide = data.etapa_id;
                    if(descricao==""){
                        descricao = "<i>Nenhuma descrição fornecida para esta etapa!</i>";
                    }
                    /* Limpa os campos do formulário de cadastro de etapas */
                    $("#input-etapa-nome-"+id_etapa).val("");
                    $("#input-etapa-descricao-"+id_etapa).val("");
                    /* Atualiza os elementos HTML no corpo */
                    $("#etapa-nome-"+id_etapa).html(nome);
                    $("#etapa-descricao-"+id_etapa).html(descricao);
                    $("#li-menu-etapa-"+id_etapa).html(nome);                    
                    /* Restaura os collapses aos estados originais */
                    $("#card-etapa-info-"+id_etapa).collapse('toggle');
                    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
                    $("#card-etapa-editar-"+id_etapa).collapse('toggle');
                    /* Libera o formulário para edição */
                    $("#fieldset-editar-etapa-" + id_etapa).prop("disabled",false);
                                                              
                }
            }
        });
    }
}
/* Fim das Ações de Edição de Etapa */
/* Ações de Exclusão de Etapa */
function ConfirmarExcluirEtapa(id_etapa,nome){
    $("#btn-excluir-etapa-"+id_etapa).tooltip('hide');
    $("#modal-excluir-etapa").modal('show');
    $("#modal-excluir-etapa-nome").html(nome);
    $("#btn-excluir-etapa").attr("onclick", "ExcluirEtapa("+id_etapa+");");
}
function ExcluirEtapa(id_etapa){
    event.preventDefault();
    idm = $("#input-metodologia-id").val();
    endereco = "/metodologias/" + idm + "/etapa/" +id_etapa + "/excluir-etapa/";
    $.ajax({
            type    : "POST",
            url     : endereco,
            data    : {'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value},
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $("#fieldset-excluir-etapa-footer").prop("disabled",true);
                $('#btn-excluir-etapa').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                if(data.sucesso)
                {
                    $("#modal-excluir-etapa").modal('hide');
                    $('#btn-excluir-etapa').html('<i class="fa fa-times"></i>&nbsp;Excluir');
                    $("#fieldset-excluir-etapa-footer").prop("disabled",false);
                    //$("#collapse-etapa-"+id_etapa).collapse('toggle');
                    $("#collapse-etapa-"+id_etapa).remove();
                    $("#li-menu-etapa-"+id_etapa).remove();
                    /* Exibe o formulário de cadastro de etapas se não houverem etapas cadastradas */
                    if(($("#div-menu-etapas").children().length) == 1){
                        $("#collapse-cadastrar-etapa").collapse('toggle');
                    }                                          
                }
            }
        });
}
/* Fim das Ações de Exclusão de Etapa */
/* Ações de Exclusão de Atividade */
function ConfirmarExcluirAtividade(id_etapa,id_atividade,nome){
    $("#btn-excluir-atividade-"+id_atividade).tooltip('hide');
    $("#modal-excluir-atividade").modal('show');
    $("#modal-excluir-atividade-nome").html(nome);
    $("#btn-excluir-atividade").attr("onclick", "ExcluirAtividade('"+id_etapa+"','"+id_atividade+"');");
}
function ExcluirAtividade(id_etapa,id_atividade){
    event.preventDefault();
    idm = $("#input-metodologia-id").val();
    endereco = "/metodologias/" + idm + "/etapa/" +id_etapa + "/atividade/" + id_atividade + "/excluir-atividade/";
    $.ajax({
            type    : "POST",
            url     : endereco,
            data    : {'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value},
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $("#fieldset-excluir-atividade-footer").prop("disabled",true);
                $('#btn-excluir-atividade').html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                if(data.sucesso)
                {
                    $("#modal-excluir-atividade").modal('hide');
                    $('#btn-excluir-atividade').html('<i class="fa fa-times"></i>&nbsp;Excluir');
                    $("#fieldset-excluir-atividade-footer").prop("disabled",false);
                    //$("#collapse-atividade-"+id_atividade).collapse('toggle');
                    $("#collapse-atividade-"+id_atividade).remove();
                    if(($("#div-listagem-atividades"+id_etapa).children().length) == 3){
                        $("#row-nenhuma-etapa-aviso-"+id_etapa).collapse('toggle');
                    }                   
                }
            }
        });
}
/* Fim das Ações de Exclusão de Atividade */
/* Ações de Edição de Atividade */
function EditarAtividade(id_etapa,id_atividade){
    $("#input-atividade-nome-"+id_etapa).val($("#atividade-nome-"+id_atividade).html());
    if($("#atividade-descricao-"+id_atividade).html() == "<i>Nenhuma descrição fornecida para esta atividade!</i>"){
        $("#input-atividade-descricao-"+id_etapa).val("");
    } else {
        $("#input-atividade-descricao-"+id_etapa).val($("#atividade-descricao-"+id_atividade).html());
    }
    $("#btn-atualizar-atividade-"+id_etapa).attr("onclick", "EnviarEditarAtividade('"+id_etapa+"','"+id_atividade+"');");
    $("#btn-edit-atividade-"+id_atividade).tooltip('hide');
    $("#card-etapa-info-"+id_etapa).collapse('toggle');
    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
    $("#card-atividade-editar-"+id_etapa).collapse('toggle');
}
function CancelarEditarAtividade(id_etapa){
    /* Limpeza do valor de campos */
    $("#input-atividade-nome-"+id_etapa).val("");
    $("#input-atividade-descricao-"+id_etapa).val("");
    /* Limpeza de estilos de validação */
    $("#div-input-atividade-nome-"+id_etapa).toggleClass("has-danger",false);
    $("#input-atividade-nome-"+id_etapa).toggleClass("form-control-danger",false);
    $("#div-atividade-nome-feedback-"+id_etapa).empty();
    /* Fecha o collapse */
    $("#card-etapa-info-"+id_etapa).collapse('toggle');
    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
    $("#card-atividade-editar-"+id_etapa).collapse('toggle');
}
function EnviarEditarAtividade(id_etapa,id_atividade){
    /* Limpeza de estilos de validação */
    $("#div-input-atividade-nome-"+id_etapa).toggleClass("has-danger",false);
    $("#input-atividade-nome-"+id_etapa).toggleClass("form-control-danger",false);
    $("#div-atividade-nome-feedback-"+id_etapa).empty();
    /* Valor das propriedades de etapa */
    nome = $("#input-atividade-nome-"+id_etapa).val();
    descricao = $("#input-atividade-descricao-"+id_etapa).val();
    idm = $("#input-metodologia-id").val();
    endereco = "/metodologias/" + idm + "/etapa/" +id_etapa + "/atividade/" + id_atividade + "/atualizar-atividade/";
    /* Verifica se o nome da etapa foi informado */
    if(!nome){
        /* Aplica estilos de aviso se o nome da etapa não foi informado */
        $("#div-input-atividade-nome-"+id_etapa).toggleClass("has-danger",true);
        $("#input-atividade-nome-"+id_etapa).toggleClass("form-control-danger",true);
        $("#div-atividade-nome-feedback-"+id_etapa).append("Informe o nome da atividade!");
    } else {
        /* Realiza a requisição ajax para cadastro */
        $.ajax({
            type    : "POST",
            url     : endereco,
            data    : { 'nome' : nome,
                        'descricao' : descricao, 
                        'csrfmiddlewaretoken' : document.form_etapa.csrfmiddlewaretoken.value,
                    },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                $("#fieldset-editar-atividade-" + id_etapa).prop("disabled",true);
                $('#btn-atualizar-atividade-'+id_etapa).html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>&nbsp;Processando');
            },
            success: function(data){
                //Cria um log da data recebida no console
                console.log(data);
                //Verifica se a operação foi bem sucedida
                if(data.sucesso)
                {
                    ide = data.etapa_id;
                    if(descricao==""){
                        descricao = "<i>Nenhuma descrição fornecida para esta atividade!</i>";
                    }
                    /* Limpa os campos do formulário de atualização de atividades */
                    $("#input-atividade-nome-"+id_etapa).val("");
                    $("#input-atividade-descricao-"+id_etapa).val("");
                    /* Atualiza os elementos HTML no corpo */
                    $("#atividade-nome-"+id_atividade).html(nome);
                    $("#atividade-descricao-"+id_atividade).html(descricao);
                    /* Restaura os collapses aos estados originais */
                    $("#card-etapa-info-"+id_etapa).collapse('toggle');
                    $("#div-listagem-atividades"+id_etapa).collapse('toggle');
                    $("#card-atividade-editar-"+id_etapa).collapse('toggle');
                    /* Libera o formulário para edição */
                    $("#fieldset-editar-atividade-" + id_etapa).prop("disabled",false);
                    $('#btn-atualizar-atividade-'+id_etapa).html('Atualizar');
                                                              
                }
            }
        });
    }
}
/* Fim das Ações de Edição de Etapa */
function smoothScroll(target){
    event.preventDefault();
    //id = nome;
    //alert(id);
    $('html, body').animate({
        scrollTop: $("#"+target).offset().top
    }, 1000);
}