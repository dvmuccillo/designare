from django.contrib.auth import logout,login,authenticate
from django.shortcuts import get_object_or_404,render,redirect
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required

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
