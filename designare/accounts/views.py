from django.contrib.auth import logout,login,authenticate
from django.shortcuts import get_object_or_404,render,redirect

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
