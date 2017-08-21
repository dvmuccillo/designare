;Designare.Methodologies.Methodology = {
    notify: Designare.Notifications,
    ajaxFeedback : Designare.Utils.AjaxFeedback,
    listGroupMethodologies      : $('#list-group-methodologies'),
    modalObjectDelete           : $('#modal-methodology-object-delete'),
    modalObjectDeleteContent    : $('#modal-methodology-object-delete-content'),
    modalObjectDeleteId         : "",
    modalObjectDeleteName       : $('#modal-methodology-object-delete-name'),
    modalObjectDeleteType       : "",
    modalObjectDeleteTitle      : $('#modal-methodology-object-delete-type'),
    GetObjectTypeName(object_type){
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
            delete_url = "/methodologies/activities/" + this.modalObjectDeleteId + "/delete/";
            break;
    
        case "methodology":
            delete_url = "/methodologies/" + this.modalObjectDeleteId + "/delete/";
            break;
        
        case "stage":
            delete_url = "/methodologies/stages/" + this.modalObjectDeleteId + "/delete/";
            break;
        }
        $.ajax({
            context : this,
            type    : "POST",
            url     : delete_url,
            data    : {'csrfmiddlewaretoken' : Designare.csrfToken},
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
                    this.RemoveMethodologyListItem(this.modalObjectDeleteId);
                    this.ajaxFeedback.log("Exclusão concluída com sucesso! <i class='fa fa-check-circle'></i>");
                    this.ajaxFeedback.setFooter(
                        "<button class='btn btn-primary border-square' data-dismiss='modal'>Fechar</button>"
                    );
                } else {
                    this.ajaxFeedback.log("Não foi possível excluir a metodologia! <i class='fa fa-exclamation-triangle'></i>");
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
    RemoveMethodologyListItem   : function (methodology_id) {
        $("#list-group-methodologies-item-" + methodology_id).remove();
        if(this.listGroupMethodologies.children().length == 1){
            this.listGroupMethodologies.children().toggleClass("d-none");
        }
    }
}