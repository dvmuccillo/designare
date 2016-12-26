;Designare.Accounts = {}
;Designare.Accounts.Profile = {
    EditPersonalInfo: function(){
        var firstName = $('#profile-first-name').html();
        var lastName = $('#profile-last-name').html();
        var email = $('#profile-email').html();
        $('#input-profile-first-name').val(firstName);
        $('#input-profile-last-name').val(lastName);
        $('#input-profile-email').val(email);
        $('#profile-personal-info').collapse('hide');
        $('#profile-personal-info-form').collapse('show');
    },
    CancelEditPersonalInfo: function(){
        event.preventDefault();
        $('#input-profile-first-name').val('');
        $('#input-profile-last-name').val('');
        $('#input-profile-email').val('');
        $('#profile-personal-info').collapse('show');
        $('#profile-personal-info-form').collapse('hide');
    },
    EditPassword: function(){
        $('#profile-password-btn').collapse('hide');
        $('#profile-password-form').collapse('show');
        $('#input-profile-current-password').focus();
    },
    CancelEditPassword: function() {
        event.preventDefault();
        $('#profile-password-btn').collapse('show');
        $('#profile-password-form').collapse('hide');
        $('#input-profile-current-password').val('');
        $('#input-profile-new-password').val('');
        $('#input-profile-confirm-password').val('');        
    }
}
