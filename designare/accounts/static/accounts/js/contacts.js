;Designare.Accounts.Contacts = {}
;Designare.Accounts.Contacts.Invite = {
    /* Elementos HTML com base nos seletores */
    /* Referência a outros namespaces */
    notify  : Designare.Notifications,
    forms   : Designare.Utils.Forms,
    /* Formulário para envio de convite */
    divInviteForm               : $('#invite-user-form'),
    inviteFormFieldset          : $('#invite-user-form-fieldset'),
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
        this.inputEmail.val('');
        this.inputMessage.val('');
        this.divInviteForm.collapse('hide');
    },
    /* Valida as informações e envia o convite */
    SendInvite: function(){
        errors = 0;
        
    }
}