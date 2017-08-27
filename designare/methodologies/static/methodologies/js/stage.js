;Designare.Methodologies.Stage = {
    /**
    * Alias for other namespaces
    */
    ajaxFeedback                : Designare.Utils.AjaxFeedback,
    forms                       : Designare.Utils.Forms,
    methodology                 : Designare.Methodologies.Methodology,
    notify                      : Designare.Notifications,
    /**
    * Elements from stage menu in methodology.html 
    */
    listGroupStage              : $('#list-group-stage-menu'),
    listGroupStageNew           : $('#list-group-stage-new'),
    /**
    * Elements from new stage form in methodology.html 
    */
    divInputStageName           : $('#div-input-stage-name'),
    divStageNew                 : $('#stage-new'),
    inputStageDescription       : $('#input-stage-description'),
    inputStageName              : $('#input-stage-name'),
    formStageNew                : $('#form-stage-new'),
    formStageNewFieldset        : $('#fieldset-stage-new'),
    /**
    * Function for clear new stage form
    */
    BtnStageNewCancelAction     : function () {
        this.formStageNew.removeClass("was-validated");
        this.inputStageName.val("");
        this.inputStageDescription.html("");
    },
    /**
    * Function for add a new stage
    */
    BtnStageNewConfirmAction    : function () {
        this.forms.FieldsetDisable(this.formStageNewFieldset);
        if(this.forms.InputIsEmpty(this.inputStageName)){
            this.inputStageName.focus();
            this.formStageNew.addClass("was-validated");
        }else{
            methodology_id = this.methodology.inputMethodologyId.val();
            target_url = "/methodologies/" + methodology_id + "/stage/register/";
            $.ajax({
                context : this,
                type    : "POST",
                url     : target_url,
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken,
                    'methodology_id'        : this.methodology.inputMethodologyId.val(),
                    'stage_name'            : this.inputStageName.val(),
                    'stage_description'     : this.inputStageDescription.html(),
                },
                dataType: "json",
                encode  : true,
                beforeSend: function(){
                    this.ajaxFeedback.clear();
                    this.ajaxFeedback.setHeader("Cadastrando etapa " + this.inputStageName.val());
                    this.ajaxFeedback.log("Enviando informações para o servidor <i class='fa fa-spinner fa-pulse'></i>");
                    this.ajaxFeedback.show();
                },
                success: function(data){
                    this.ajaxFeedback.reset();
                    if(data.success)
                    {
                        menu_item = "<a href='#stage-" + data.stage_id + "' id='list-group-stage-item-" + data.stage_id + "'"
                                    + "class='list-group-item list-group-item-action border-square'>"
                                    + data.stage_name + "</a>";
                        this.ajaxFeedback.log("Cadastro concluído com sucesso! <i class='fa fa-check-circle'></i>");
                        this.formStageNew.removeClass("was-validated");
                        this.inputStageName.val("");
                        this.inputStageDescription.html("");
                        $(menu_item).insertBefore(this.listGroupStageNew);
                        $(data.template).insertBefore(this.divStageNew);
                        $('[data-spy="scroll"]').each(function () {
                            var $spy = $(this).scrollspy('refresh')
                        })
                    } else {
                        this.ajaxFeedback.log("Não foi possível realizar o cadastro! <i class='fa fa-exclamation-triangle'></i>");
                        this.ajaxFeedback.log("Tente novamente mais tarde!");
                    }
                    this.ajaxFeedback.setFooter(
                        "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                    );
                },
                error: function(data){
                    this.ajaxFeedback.reset();
                    this.ajaxFeedback.log("Houve um problema ao enviar as informações para o servidor <i class='fa fa-exclamation-circle'></i>");
                    this.ajaxFeedback.log("Tente novamente mais tarde!");
                    this.ajaxFeedback.setFooter(
                        "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                    );
               }
            }); 
        }
        this.forms.FieldsetEnable(this.formStageNewFieldset);
    },
    /**
    * Function for remove a stage (item menu and card) from html
    */
    RemoveStageItem             : function (stage_id){
        $('#list-group-stage-item-' + stage_id).remove();
        $('#stage-' +  stage_id).collapse('hide').remove();
    }
}
