;Designare.Utils.AjaxFeedback = {
    modal               : $('#modal-ajax-feedback'),
    modalContent        : $('#modal-ajax-feedback-content'),
    modalHeader         : $('#modal-ajax-feedback-header'),
    modalBody           : $('#modal-ajax-feedback-body'),
    modalFooter         : $('#modal-ajax-feedback-footer'),
    hide                : function () {
        this.modal.modal('hide');
    },
    show                : function () {
        this.modal.modal('show');
    },
    clear               : function () {
        this.modalHeader.html("");
        this.modalBody.html("");
        this.modalFooter.html("");
    },
    reset               : function (){
        this.modalBody.html("");
    },
    log                 : function (event_content){
        logLine = "<div class='row'>"
                 +"<div class='col-md-11 ml-auto mr-auto'>"
                 +"<p>"+event_content+"</p>"
                 +"</div></div>";
        this.modalBody.append(logLine);
    },
    setHeader           : function(content){
        this.modalHeader.html(content);
    },
    setFooter           : function(content){
        this.modalFooter.html(content);
    }
}