;Designare.Accounts.Profile = {
    /* Elementos HTML com base nos seletores */
    firstName                   : $('#profile-first-name'),
    lastName                    : $('#profile-last-name'),
    email                       : $('#profile-email'),
    inputFirstName              : $('#input-profile-first-name'),
    inputLastName               : $('#input-profile-last-name'),
    inputEmail                  : $('#input-profile-email'),
    divPersonalInfo             : $('#profile-personal-info'),
    divPersonalInfoForm         : $('#profile-personal-info-form'),
    personalInfoFormFieldset    : $('#profile-personal-info-fieldset'),
    personalInfoFormBtnUpdate   : $('#profile-personal-info-btn-update'),
    divPasswordBtn              : $('#profile-password-btn'),
    divPasswordForm             : $('#profile-password-form'),
    inputCurrentPassword        : $('#input-profile-current-password'),
    inputNewPassword            : $('#input-profile-new-password'),
    inputConfirmPassword        : $('#input-profile-confirm-password'),
    /* Atualiza elementos de feedback de input */
    InputStateUpdate: function(input,css_class,toggle){
        base_id = input.attr('id');
        $("#"+base_id+"-group").toggleClass('has-'+css_class,toggle);
        input.toggleClass('form-control-'+css_class,toggle);
    },
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
        this.InputStateUpdate(this.inputFirstName,'danger',false);
        this.InputStateUpdate(this.inputLastName,'danger',false);
        this.InputStateUpdate(this.inputEmail,'danger',false);
        this.divPersonalInfo.collapse('show');
        this.divPersonalInfoForm.collapse('hide');
    },
    CancelEditPersonalInfo: function(){
        event.preventDefault();
        this.ClearPersonalInfoForm();
    },
    /* Executa o processo de validar e atualizar informações pessoais */
    UpdatePersonalInfo: function(){
        event.preventDefault();
        errors = 0;
        this.InputStateUpdate(this.inputFirstName,'danger',false);
        this.InputStateUpdate(this.inputLastName,'danger',false);
        this.InputStateUpdate(this.inputEmail,'danger',false);
        /* Bloqueia o formulário durante o processamento */
        this.personalInfoFormFieldset.attr('disabled',true);
        this.personalInfoFormBtnUpdate.html('<i class="fa fa-circle-o-notch fa-spin"></i> Processando');
        /* Valida os campos */
        if ($.trim(this.inputFirstName.val()).length == 0){
            this.InputStateUpdate(this.inputFirstName,'danger',true);
            errors++;
        }
        if ($.trim(this.inputLastName.val()).length == 0){
            this.InputStateUpdate(this.inputLastName,'danger',true);
            errors++;
        }
        if ($.trim(this.inputEmail.val()).length == 0){
            this.InputStateUpdate(this.inputEmail,'danger',true);
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
                beforeSend: function(){
                    //do nothing...
                },
                success : function(data){
                    console.log(data);
                    if (data.success) {
                        iziToast.success({
                            title: 'Tudo certo!',
                            message: 'Seus dados foram atualizados!',
                            position: 'center',
                        });
                        p = Designare.Accounts.Profile;
                        p.firstName.html(p.inputFirstName.val());
                        p.lastName.html(p.inputLastName.val());
                        p.email.html(p.inputEmail.val());
                        p.ClearPersonalInfoForm();
                        p.personalInfoFormFieldset.attr('disabled',false);
                        p.personalInfoFormBtnUpdate.html('<i class="fa fa-check"></i> Atualizar');
                    }
                }
            });
        } else {
            iziToast.error({
                title: 'Epa, temos um erro!',
                message: 'Todos os campos devem ser preenchidos!',
                position: 'center',
            });
            this.personalInfoFormFieldset.attr('disabled',false);
            this.personalInfoFormBtnUpdate.html('<i class="fa fa-check"></i> Atualizar');
        }
    },
    /* Exibe o formulário de alteração de senha */
    EditPassword: function(){
        this.divPasswordBtn.collapse('hide');
        this.divPasswordForm.collapse('show');
        this.inputCurrentPassword.focus();
    },
    /* Recolhe o formulário de alteração de senha e limpa os campos */
    CancelEditPassword: function() {
        event.preventDefault();
        this.divPasswordBtn.collapse('show');
        this.divPasswordForm.collapse('hide');
        this.inputCurrentPassword.val('');
        this.inputNewPassword.val('');
        this.inputConfirmPassword.val('');        
    }
}
