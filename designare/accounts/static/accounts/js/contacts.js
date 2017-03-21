;Designare.Accounts.Contacts = {}
;Designare.Accounts.Contacts.Invite = {
    /* Elementos HTML com base nos seletores */
    /* Referência a outros namespaces */
    notify  : Designare.Notifications,
    forms   : Designare.Utils.Forms,
    /* Abas */
    tabInvites                  : $('#tab-invites'),
    /*  */
    divInvites                  : $('#div-invites'),
    divNoneInvite               : $('#div-none-invite'),
    /* Formulário para envio de convite */
    divInviteForm               : $('#invite-user-form'),
    inviteFormFieldset          : $('#invite-user-form-fieldset'),
    inviteFormBtnSend           : $('#invite-btn-send'),
    inputName                   : $('#input-invite-name'),
    inputEmail                  : $('#input-invite-email'),
    inputMessage                : $('#input-invite-message'),      
    /* Fim dos elementos HTML */
    /* Adiciona o card de convite */
    AppendInviteCard: function(card_invite){
        if(this.divNoneInvite.length){
            this.divNoneInvite.remove();
        }
        this.divInvites.append(card_invite);
    },
    /* Limpa e recolhe o formulário de convite */
    ClearInviteForm: function(){
        this.inputName.val('');
        this.forms.InputStateUpdate(this.inputName,'clear');
        this.inputEmail.val('');
        this.forms.InputStateUpdate(this.inputEmail,'clear');
        this.inputMessage.val('');
    },
    /* Reenvia o convite */
    ResendInvite: function(invite_id){
        $.ajax({
                type    : 'POST',
                url     : '/accounts/my/contacts/resend-invite/',
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken,
                    'invite_id'             : invite_id,
                },
                dataType: 'json',
                encode  : true,
                // Mapeia o namespace para o contexto atual
                i       : Designare.Accounts.Contacts.Invite,
                error: function(){
                    this.i.notify.error({
                        title: 'Não conseguimos enviar seu convite neste momento!',
                        message: 'Tente novamente mais tarde.',
                        position: 'center',
                    });
                },
                success: function (data) {
                    console.log(data);
                    if(data.success){
                        this.i.notify.success({
                            title   : 'Seu convite foi enviado!',
                            position: 'center',
                        });
                        element_id = "#invite-card-" + data.invite_id;
                        $(element_id).addClass("card-outline-primary").removeClass("card-outline-warning");
                        $(element_id + "> .card-header").addClass("bg-primary").removeClass("bg-warning");
                        $(element_id + "> .card-block > .btn").remove();
                    } else {
                        switch(data.error_type){
                            case 'unable_to_send_email':
                                this.i.tabInvites.tab('show');
                                this.i.notify.warning({
                                    title: data.error_title,
                                    message: data.error_message,
                                    position: 'center',
                                });
                                break;
                        };
                        
                    }
                }
            });
    },
    /* Valida as informações e envia o convite */
    SendInvite: function(){
        errors = 0;
        this.forms.InputStateUpdate(this.inputName,'clear');
        this.forms.InputStateUpdate(this.inputEmail,'clear');
        /* Bloqueia o formulário durante o processamento */
        this.inviteFormFieldset.attr('disabled',true);
        this.inviteFormBtnSend.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
        /* Verifica por campos vazios */
        if(this.forms.InputIsEmpty(this.inputName)){
            this.forms.InputStateUpdate(this.inputName,'danger');
            errors++;
        }
        if(this.forms.InputIsEmpty(this.inputEmail)){
            this.forms.InputStateUpdate(this.inputEmail,'danger');
            errors++;
        }
        /* Verifica se não foram encontrados erros */
        if(errors == 0){
            $.ajax({
                type    : 'POST',
                url     : '/accounts/my/contacts/send-invite/',
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken,
                    'name'                  : this.inputName.val(),
                    'email'                 : this.inputEmail.val(),
                    'message'               : this.inputMessage.val(),
                },
                dataType: 'json',
                encode  : true,
                /* Mapeia o namespace para o contexto atual */
                i       : Designare.Accounts.Contacts.Invite,
                error: function(){
                    this.i.notify.error({
                        title: 'Não conseguimos enviar seu convite neste momento!',
                        message: 'Tente novamente mais tarde.',
                        position: 'center',
                    });
                },
                success: function (data) {
                    if(data.success){
                        this.i.ClearInviteForm();
                        this.i.AppendInviteCard(data.template);
                        this.i.tabInvites.tab('show');
                        this.i.notify.success({
                            title   : 'Seu convite foi enviado!',
                            position: 'center',
                        });
                    } else {
                        switch(data.error_type){
                            default:
                                this.i.ClearInviteForm();
                                this.i.AppendInviteCard(data.template);
                                this.i.tabInvites.tab('show');
                                this.i.notify.warning({
                                    title: data.error_title,
                                    message: data.error_message,
                                    position: 'center',
                                });
                                break;
                        };
                        
                    }
                }
            });
        }else{
            this.notify.error({
                title: 'Nome e E-mail são campos obrigatórios!',
                position: 'center',
            })
        }
        this.inviteFormFieldset.attr('disabled',false);
        this.inviteFormBtnSend.html('<i class="fa fa-check"></i> Enviar convite');
    },
    /* Exibe o formulário de convite */
    ShowInviteForm: function(){
        this.inputName.focus();
    },
}