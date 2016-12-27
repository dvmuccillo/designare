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
    user = request.user
    firstName = request.POST.get('firstName')
    lastName = request.POST.get('lastName')
    email = request.POST.get('email')
    user.first_name = firstName
    user.last_name = lastName
    user.email = email
    user.save()
    return JsonResponse({
            'success' : True,
        })
