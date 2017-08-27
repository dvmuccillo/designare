;Designare.Methodologies.Methodology = {
    /**
     * Alias for other namespaces
     */
    ajaxFeedback                : Designare.Utils.AjaxFeedback,
    forms                       : Designare.Utils.Forms,
    notify                      : Designare.Notifications,
    /**
     * Elements from /methodologies/
     */
    listGroupMethodologies      : $('#list-group-methodologies'),
    modalObjectDelete           : $('#modal-methodology-object-delete'),
    modalObjectDeleteContent    : $('#modal-methodology-object-delete-content'),
    modalObjectDeleteId         : "",
    modalObjectDeleteName       : $('#modal-methodology-object-delete-name'),
    modalObjectDeleteType       : "",
    modalObjectDeleteTitle      : $('#modal-methodology-object-delete-type'),
    /**
     * Elements from /methodologies/new/ or /methodologies/<methodology_id>/
     */
    btnMethodologyCancelText    : $('#btn-methodology-cancel-text'),
    btnMethodologyConfirmText   : $('#btn-methodology-confirm-text'),
    divFormMethodology          : $('#div-form-methodology'),
    divMethodologyName          : $('#div-methodology-name'),
    divMethodologyNewInfo       : $('#div-methodology-new-info'),
    divRowStages                : $('#div-row-stages'),
    inputMethodologyId          : $('#input-methodology-id'),
    inputMethodologyName        : $('#input-methodology-name'),
    formMethodology             : $('#form-methodology'),
    formMethodologyFieldset     : $('#form-methodology-fieldset'),
    spanMethodologyName         : $('#span-methodology-name'),    
    /**
     * Functions for delete object (methodology, stage or activity)
     */
    GetObjectTypeName           : function(object_type){
        switch (object_type) {
            case "activity":
                return "Atividade";
                break;
        
            case "methodology":
                return "Metodologia";
                break;
            
            case "stage":
                return "Etapa";
                break;
        }
    },
    ShowModalDeleteObject       : function (object_type,object_id,object_name) {
        this.modalObjectDeleteId = object_id;
        this.modalObjectDeleteName.html(object_name);
        this.modalObjectDeleteType = object_type;
        this.modalObjectDeleteTitle.html(this.GetObjectTypeName(object_type));
        this.modalObjectDelete.modal('show');
    },
    DeleteObject                : function () {
        switch(this.modalObjectDeleteType){
            case "activity":
            delete_url = "/methodologies/" + this.modalObjectDeleteId + "/acitivity/delete/";
            break;
    
        case "methodology":
            delete_url = "/methodologies/" + this.modalObjectDeleteId + "/delete/";
            break;
        
        case "stage":
            delete_url = "/methodologies/" + this.inputMethodologyId.val() + "/stage/delete/";
            break;
        }
        $.ajax({
            context : this,
            type    : "POST",
            url     : delete_url,
            data    : {
                'csrfmiddlewaretoken' : Designare.csrfToken,
                'object_id'           : this.modalObjectDeleteId,
                'object_type'         : this.modalObjectDeleteType,
            },
            dataType: "json",
            encode  : true,

            beforeSend: function(){
                this.modalObjectDelete.modal('hide');
                this.ajaxFeedback.clear();
                this.ajaxFeedback.setHeader("Excluindo " + this.GetObjectTypeName(this.modalObjectDeleteType) + " " + this.modalObjectDeleteName.html());
                this.ajaxFeedback.log("Enviando informações para o servidor <i class='fa fa-spinner fa-pulse'></i>");
                this.ajaxFeedback.show();
            },
            success: function(data){
                this.ajaxFeedback.reset();
                if(data.success)
                {
                    switch(this.modalObjectDeleteType){
                        case "activity":
                        delete_url = "/methodologies/activities/" + this.modalObjectDeleteId + "/delete/";
                        break;
                
                    case "methodology":
                        this.RemoveMethodologyListItem(this.modalObjectDeleteId);
                        break;
                    
                    case "stage":
                        Designare.Methodologies.Stage.RemoveStageItem(this.modalObjectDeleteId);
                        break;
                    }
                    this.ajaxFeedback.log("Exclusão concluída com sucesso! <i class='fa fa-check-circle'></i>");
                    this.ajaxFeedback.setFooter(
                        "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                    );
                } else {
                    this.ajaxFeedback.log("Não foi possível realizar a exclusão! <i class='fa fa-exclamation-triangle'></i>");
                    this.ajaxFeedback.log("Tente novamente mais tarde!");
                    this.ajaxFeedback.setFooter(
                        "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                    );
                }
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
    },
    /** 
     * Remove a methodology item from the list group in /methodologies/  
     */
    RemoveMethodologyListItem   : function (methodology_id) {
        $("#list-group-methodologies-item-" + methodology_id).remove();
        if(this.listGroupMethodologies.children().length == 1){
            this.listGroupMethodologies.children().toggleClass("d-none");
        }
    },
    /**
     * Functions for use in /methodologies/new/ or /methodologies/<methodology_id>/ 
     */
    BtnMethodologyCancelAction  : function (){
        if(this.forms.InputIsEmpty(this.inputMethodologyId)){
            $(window.document.location).attr('href','/methodologies/');
        } else {
            this.formMethodology.removeClass("was-validated");
            this.divFormMethodology.removeClass("d-flex").addClass("d-none");
            this.divMethodologyNewInfo.removeClass("d-flex").addClass("d-none");
            this.divMethodologyName.removeClass("d-none").addClass("d-flex");
        }
    },
    BtnMethodologyConfirmAction  : function (){
        this.forms.FieldsetDisable(this.formMethodologyFieldset);
        if(this.forms.InputIsEmpty(this.inputMethodologyName)){
            this.inputMethodologyName.focus();
            this.formMethodology.addClass("was-validated");
        }else{
            if(this.forms.InputIsEmpty(this.inputMethodologyId)){
                target_url = "/methodologies/new/register/";
            } else {
                target_url = "/methodologies/" + this.inputMethodologyId.val() + "/update/";
            }
            $.ajax({
                context : this,
                type    : "POST",
                url     : target_url,
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken,
                    'methodology_id'        : this.inputMethodologyId.val(),
                    'methodology_name'      : this.inputMethodologyName.val(),
                },
                dataType: "json",
                encode  : true,
    
                beforeSend: function(){
                    this.ajaxFeedback.clear();
                    if(this.forms.InputIsEmpty(this.inputMethodologyId)){
                        this.ajaxFeedback.setHeader("Cadastrando metodologia " + this.inputMethodologyName.val());
                    } else {
                        this.ajaxFeedback.setHeader("Atualizando metodologia " + this.inputMethodologyName.val());
                    }
                    this.ajaxFeedback.log("Enviando informações para o servidor <i class='fa fa-spinner fa-pulse'></i>");
                    this.ajaxFeedback.show();
                },
                success: function(data){
                    this.ajaxFeedback.reset();
                    if(data.success)
                    {
                        if(this.forms.InputIsEmpty(this.inputMethodologyId)){
                            window.history.replaceState(null, null, "/methodologies/"+data.methodology_id+"/")
                            this.inputMethodologyId.val(data.methodology_id);
                            this.btnMethodologyCancelText.html("Cancelar");
                            this.btnMethodologyConfirmText.html("Atualizar");
                            this.ajaxFeedback.log("Cadastro concluído com sucesso! <i class='fa fa-check-circle'></i>");
                            this.divRowStages.removeClass("d-none").addClass("d-flex");
                        }else{
                            this.ajaxFeedback.log("Atualização concluída com sucesso! <i class='fa fa-check-circle'></i>");
                        }
                        this.ajaxFeedback.setFooter(
                            "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                        );
                        this.spanMethodologyName.html(this.inputMethodologyName.val());
                        this.divMethodologyName.removeClass("d-none").addClass("d-flex");
                        this.formMethodology.removeClass("was-validated");
                        this.divFormMethodology.removeClass("d-flex").addClass("d-none");
                        this.divMethodologyNewInfo.removeClass("d-flex").addClass("d-none");
                    } else {
                        this.ajaxFeedback.log("Não foi possível realizar a ação! <i class='fa fa-exclamation-triangle'></i>");
                        this.ajaxFeedback.log("Tente novamente mais tarde!");
                        this.ajaxFeedback.setFooter(
                            "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                        );
                    }
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
        this.forms.FieldsetEnable(this.formMethodologyFieldset);
    },
    BtnMethodologyEditAction    : function () {
        this.inputMethodologyName.val(this.spanMethodologyName.html())
        this.divFormMethodology.removeClass("d-none").addClass("d-flex");
        this.divMethodologyNewInfo.removeClass("d-none").addClass("d-flex");
        this.divMethodologyName.removeClass("d-flex").addClass("d-none");
    }
}