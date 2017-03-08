;Designare.Accounts.Profile = {
    /* Referência a outros namespaces */
    notify: Designare.Notifications,
    forms   : Designare.Utils.Forms,
    /* Elementos HTML com base nos seletores */
    /* Informações Pessoais */
    firstName                   : $('#profile-first-name'),
    lastName                    : $('#profile-last-name'),
    email                       : $('#profile-email'),
    /* Formulário para alteração de informações pessoais */
    divPersonalInfo             : $('#profile-personal-info'),
    divPersonalInfoForm         : $('#profile-personal-info-form'),
    inputFirstName              : $('#input-profile-first-name'),
    inputLastName               : $('#input-profile-last-name'),
    inputEmail                  : $('#input-profile-email'),
    personalInfoFormFieldset    : $('#profile-personal-info-fieldset'),
    personalInfoFormBtnUpdate   : $('#profile-personal-info-btn-update'),
    /* Formulário para alteração de senha */    
    divPasswordBtn              : $('#profile-password-btn'),
    divPasswordForm             : $('#profile-password-form'),
    inputCurrentPassword        : $('#input-profile-current-password'),
    inputNewPassword            : $('#input-profile-new-password'),
    inputConfirmPassword        : $('#input-profile-confirm-password'),
    modalPasswordNotify         : $('#modal-password-change-success'),
    passwordFormFieldset        : $('#profile-password-fieldset'),
    passwordFormBtnUpdate       : $('#profile-password-btn-update'),
    /* Fim dos elementos HTML */
    /* Exibe o formulário de alteração de informações pessoais */
    EditPersonalInfo: function(){
        this.inputFirstName.val(this.firstName.html());
        this.inputLastName.val(this.lastName.html());
        this.inputEmail.val(this.email.html());
        this.divPersonalInfo.collapse('hide');
        this.divPersonalInfoForm.collapse('show');
    },
    /* Recolhe o formulário de alteração de informações pessoais e limpa os campos */
    ClearPersonalInfoForm: function(){
        this.inputFirstName.val('');
        this.inputLastName.val('');
        this.inputEmail.val('');
        this.forms.InputStateUpdate(this.inputFirstName,'clear');
        this.forms.InputStateUpdate(this.inputLastName,'clear');
        this.forms.InputStateUpdate(this.inputEmail,'clear');
        this.divPersonalInfo.collapse('show');
        this.divPersonalInfoForm.collapse('hide');
    },
    CancelEditPersonalInfo: function(){
        this.ClearPersonalInfoForm();
    },
    /* Executa o processo de validar e atualizar informações pessoais */
    UpdatePersonalInfo: function(){
        errors = 0;
        this.forms.InputStateUpdate(this.inputFirstName,'clear');
        this.forms.InputStateUpdate(this.inputLastName,'clear');
        this.forms.InputStateUpdate(this.inputEmail,'clear');
        /* Bloqueia o formulário durante o processamento */
        this.personalInfoFormFieldset.attr('disabled',true);
        this.personalInfoFormBtnUpdate.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
        /* Verifica por campos vazios */
        if (this.forms.InputIsEmpty(this.inputFirstName)){
            this.forms.InputStateUpdate(this.inputFirstName,'danger');
            errors++;
        }
        if (this.forms.InputIsEmpty(this.inputLastName)){
            this.forms.InputStateUpdate(this.inputLastName,'danger');
            errors++;
        }
        if (this.forms.InputIsEmpty(this.inputEmail)){
            this.forms.InputStateUpdate(this.inputEmail,'danger');
            errors++;
        }
        /* Verifica se não houve erros */
        if (errors == 0) {
            $.ajax({
                type    : 'POST',
                url     : '/accounts/my/profile/update-personal-info/',
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken, 
                    'firstName'             : this.inputFirstName.val(),
                    'lastName'              : this.inputLastName.val(),
                    'email'                 : this.inputEmail.val(),
                },
                dataType: 'json',
                encode  : true,
                /* Mapeia o namespace para o contexto atual */
                p: Designare.Accounts.Profile,                    
                beforeSend: function(){
                    this.p.personalInfoFormFieldset.attr('disabled',true);
                    this.p.personalInfoFormBtnUpdate.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
                },
                error: function(){
                    this.p.notify.error({
                        title: 'Não conseguimos atualizar seus dados neste momento!',
                        message: 'Verifique sua conexão com a internet e tente novamente.',
                        position: 'center',
                    });
                },
                success : function(data){
                    console.log(data);
                    if (data.success) {
                        /* Mapeia o namespace para o contexto atual */
                        this.p.notify.success({
                            title: 'Seus dados foram atualizados!',
                            position: 'center',
                        });
                        this.p.firstName.html(this.p.inputFirstName.val());
                        this.p.lastName.html(this.p.inputLastName.val());
                        this.p.email.html(this.p.inputEmail.val());
                        this.p.ClearPersonalInfoForm();                        
                    }
                    else {
                        this.p.notify.error({
                            title: 'Todos os campos devem ser preenchidos!',
                            position: 'center',
                        });
                    }
                }
            });
        } else {
            this.notify.error({
                title: 'Todos os campos devem ser preenchidos!',
                position: 'center',
            });
            
        }
        this.personalInfoFormFieldset.attr('disabled',false);
        this.personalInfoFormBtnUpdate.html('<i class="fa fa-check"></i> Atualizar');;
    },
    /* Exibe o formulário de alteração de senha */
    EditPassword: function(){
        this.divPasswordBtn.collapse('hide');
        this.divPasswordForm.collapse('show');
        this.inputCurrentPassword.focus();
    },
    /* Recolhe o formulário de alteração de senha e limpa os campos */
    CancelEditPassword: function() {
        this.divPasswordBtn.collapse('show');
        this.divPasswordForm.collapse('hide');
        this.inputCurrentPassword.val('');
        this.forms.InputStateUpdate(this.inputCurrentPassword,'clear');
        this.inputNewPassword.val('');
        this.forms.InputStateUpdate(this.inputNewPassword,'clear');
        this.inputConfirmPassword.val('');
        this.forms.InputStateUpdate(this.inputConfirmPassword,'clear');    
    },
    /* Executa o processo de validar e atualizar senha */
    UpdatePassword: function(){
        errors = 0;
        this.forms.InputStateUpdate(this.inputCurrentPassword,'clear');
        this.forms.InputStateUpdate(this.inputNewPassword,'clear');
        this.forms.InputStateUpdate(this.inputConfirmPassword,'clear');
        /* Bloqueia o formulário durante o processamento */
        this.passwordFormFieldset.attr('disabled',true);
        this.passwordFormBtnUpdate.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
        /* Verifica por campos vazios */
        if ($.trim(this.inputCurrentPassword.val()).length == 0){
            this.forms.InputStateUpdate(this.inputCurrentPassword,'danger');
            errors++;
        }
        if ($.trim(this.inputNewPassword.val()).length == 0){
            this.forms.InputStateUpdate(this.inputNewPassword,'danger');
            errors++;
        }
        if ($.trim(this.inputConfirmPassword.val()).length == 0){
            this.forms.InputStateUpdate(this.inputConfirmPassword,'danger');
            errors++;
        }
        /* Verifica se não houve erros */
        if (errors == 0) {
            $.ajax({
                type    : 'POST',
                url     : '/accounts/my/profile/update-password/',
                data    : {
                    'csrfmiddlewaretoken'   : Designare.csrfToken, 
                    'current'               : this.inputCurrentPassword.val(),
                    'new'                   : this.inputNewPassword.val(),
                    'confirm'               : this.inputConfirmPassword.val(),
                },
                dataType: 'json',
                encode  : true,
                /* Mapeia o namespace para o contexto atual */
                p: Designare.Accounts.Profile,                    
                beforeSend: function(){
                    this.p.passwordFormFieldset.attr('disabled',true);
                    this.p.passwordFormBtnUpdate.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
                },
                error: function(){
                    this.p.notify.error({
                        title: 'Não conseguimos atualizar sua senha neste momento!',
                        message: 'Verifique sua conexão com a internet e tente novamente.',
                        position: 'center',
                    });
                },
                success : function(data){
                    console.log(data);
                    if (data.success) {
                        /* Mapeia o namespace para o contexto atual */
                        this.p.modalPasswordNotify.modal('show');
                        this.p.CancelEditPassword();                        
                    }
                    else {
                        switch(data.error_type){
                            case 'wrong_password':
                                this.p.forms.InputStateUpdate(this.p.inputCurrentPassword,'danger',true);
                                break;
                            case 'confirm_dont_match':
                                this.p.forms.InputStateUpdate(this.p.inputNewPassword,'danger',true);
                                this.p.forms.InputStateUpdate(this.p.inputConfirmPassword,'danger',true);
                                break;
                        }
                        this.p.notify.error({
                            title: data.error_title,
                            message: data.error_message,
                            position: 'center',
                        });
                    }
                }
            });
        } else {
            this.notify.error({
                title: 'Todos os campos devem ser preenchidos!',
                position: 'center',
            });
            
        }
        this.passwordFormFieldset.attr('disabled',false);
        this.passwordFormBtnUpdate.html('<i class="fa fa-check"></i> Atualizar');;
    },
}
