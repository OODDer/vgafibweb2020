from django.shortcuts import render
from django.shortcuts import redirect

# Create your views here.


# def index(request):
#     return render(request, "home.html")


def index(request):
    return redirect('cursos_index')
