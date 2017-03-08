;Designare.Accounts.Contacts = {}
;Designare.Accounts.Contacts.Invite = {
    /* Elementos HTML com base nos seletores */
    /* Referência a outros namespaces */
    notify  : Designare.Notifications,
    forms   : Designare.Utils.Forms,
    /* Formulário para envio de convite */
    divInviteForm               : $('#invite-user-form'),
    inviteFormFieldset          : $('#invite-user-form-fieldset'),
    inviteFormBtnSend           : $('#invite-btn-send'),
    inputName                   : $('#input-invite-name'),
    inputEmail                  : $('#input-invite-email'),
    inputMessage                : $('#input-invite-message'),      
    /* Fim dos elementos HTML */
    /* Exibe o formulário de convite */
    ShowInviteForm: function(){
        this.divInviteForm.collapse('show');
        this.inputName.focus();
    },
    /* Limpa e recolhe o formulário de convite */
    ClearInviteForm: function(){
        this.inputName.val('');
        this.forms.InputStateUpdate(this.inputName,'clear');
        this.inputEmail.val('');
        this.forms.InputStateUpdate(this.inputEmail,'clear');
        this.inputMessage.val('');
        this.divInviteForm.collapse('hide');
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

        }else{
            this.notify.error({
                title: 'Nome e E-mail são campos obrigatórios!',
                position: 'center',
            })
        }
        this.inviteFormFieldset.attr('disabled',false);
        this.inviteFormBtnSend.html('<i class="fa fa-check"></i> Enviar convite');
    }
}