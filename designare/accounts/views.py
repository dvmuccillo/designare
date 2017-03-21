from django.contrib.auth import logout,login,authenticate
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError,ObjectDoesNotExist
from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404,render,redirect
from django.template.loader import render_to_string
from .models import Invite

def login_view(request):
    username = request.POST.get('username','')
    password = request.POST.get('password','')
    next = request.GET['next']
    error = False
    if username and password: 
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(next)
        else:
            error = True
    return render(request,"accounts/login.html",{'next' : next, 'error' : error})

def logout_view(request):
    logout(request)
    return redirect("/")
@login_required
def user_profile(request):
    return render(request,"accounts/profile.html")

@login_required
def update_personal_info(request):
    first_name = request.POST.get('firstName')
    last_name = request.POST.get('lastName')
    email = request.POST.get('email')
    error_title = ''
    error_message = ''
    if first_name and last_name and email:
        user = request.user
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        success = True
    else:
        success = False
    return JsonResponse({'success' : success})

@login_required
def update_password(request):
    current_password = request.POST.get('current')
    new_password = request.POST.get('new')
    confirm = request.POST.get('confirm')
    error_type = ''
    error_title = ''
    error_message = ''
    #Verifica se nenhum campo está vazio
    if current_password and new_password and confirm:
        user = request.user
        #verifica a senha atual
        if user.check_password(current_password):
            #verifica se a nova senha é igual a confirmação
            if new_password == confirm:
                user.set_password(new_password)
                user.save()
                success = True
            else:         
                success = False
                error_type = 'confirm_dont_match'
                error_title = 'As senhas não conferem!'
                error_message = 'A confirmação precisa ser igual a nova senha.'
        else:
            success = False
            error_type = 'wrong_password'
            error_title = 'A senha atual está incorreta!'
            error_message = 'A senha informada não corresponde a sua senha atual.'
    else:
        success = False
        error_title = 'Preencha todos os campos!'
        error_message = ''
    return JsonResponse({
        'success'       : success,
        'error_type'    : error_type,
        'error_title'   : error_title, 
        'error_message' : error_message 
    })

@login_required
def user_contacts(request):
    return render(request, "accounts/contacts.html")

@login_required
def user_send_invite(request):
    target_name = request.POST.get('name')
    target_email = request.POST.get('email')
    message = request.POST.get('message')
    error_type = ''
    error_title = ''
    error_message = ''
    template = ''
    #Verifica se nenhum campo está vazio
    if target_name and target_email:
        invite = Invite(
            host_user = request.user,
            target_name = target_name,
            target_email = target_email,
            message = message
        )
        try:
            invite.clean_fields()
            invite.save()
            try:
                invite.send_mail()
                success = True
            except:
                invite.unsent = True
                invite.save()
                success = False
                error_type = "unable_to_send_email"
                error_title = "Não conseguimos enviar o convite no momento!"
                error_message = "Por favor, tente novamente mais tarde."
            template = render_to_string("accounts/components/card-invite.html", {'invite':invite})
        except ValidationError:
            success = False
            error_type = "invalid_email_address"
            error_title = "Informe um e-mail válido!"
    else:
        success = False
        error_title = 'Nome e E-mail são campos obrigatórios!'

    return JsonResponse({
        'success'       : success,
        'error_type'    : error_type,
        'error_title'   : error_title, 
        'error_message' : error_message,
        'template'      : template
    })

@login_required
def user_resend_invite(request):
    invite_id = request.POST.get('invite_id')
    print(invite_id)
    success = False
    error_type = ''
    error_title = ''
    error_message = ''
    if invite_id:
        try:
            invite = Invite.objects.get(pk=invite_id)
            if invite.unsent:
                try:
                    invite.send()
                    invite.unsent = False
                    invite.save()
                    success = True
                except:
                    error_type = "unable_to_send_email"
                    error_title = "Não conseguimos enviar o convite no momento!"
                    error_message = "Por favor, tente novamente mais tarde."
            else:
                error_type = "invite_already_sent"
                error_title = "Este convite já foi enviado!"
        except ObjectDoesNotExist:
            error_type = "invite_not_found"
            error_title = "Este convite não existe!"
    else:
        error_type = "missing_invite_id"
    return JsonResponse({
        'success'       : success,
        'error_type'    : error_type,
        'error_title'   : error_title, 
        'error_message' : error_message,
        'invite_id'     : invite_id
    })