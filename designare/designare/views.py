from django.contrib.auth import logout
from django.shortcuts import get_object_or_404,render,redirect

def logout_view(request):
    logout(request)
    return redirect("/")
