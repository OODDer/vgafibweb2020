from django.shortcuts import render
from cursos import forms
from django.contrib.admin.views.decorators import staff_member_required
from . import models
from .models import InfoCurso, Curso
from django.shortcuts import redirect
from django.core.mail import send_mail
import datetime
from django.core.files.storage import FileSystemStorage
# Create your views here.


def index(request):
    cursos = Curso.objects.filter(fecha_fin__gt=datetime.date.today())

    for c in cursos:
        c.info.descripcio = c.info.descripcio[0:200]+"..."

    context = {
        'cursos': cursos
    }
    return render(request, "cursos_index.html", context=context)


@staff_member_required()
def edit_curso(request, curso_id):
    if request.method == "GET":
        curso = models.Curso.objects.get(id=curso_id)
        curso_form = forms.CursoForm(initial={
            'id':curso.id,
            'info_id':curso.info.id,
            'fecha_inicio':curso.fecha_inicio,
            'fecha_fin': curso.fecha_fin,
            'hora_inicio': curso.hora_inicio,
            'hora_fin': curso.hora_fin,
            'cartel': curso.cartel
        })
        context = {
            'new_curso_form': curso_form

        }
        return render(request, "new_curso.html", context=context)
    elif request.method == "POST":
        form = forms.CursoForm(request.POST, request.FILES)
        if form.is_valid():
            newCurso = models.Curso()
            newCurso.id = form.cleaned_data['id']
            newCurso.info = InfoCurso.objects.get(id=form.cleaned_data['info_id'])
            newCurso.fecha_inicio = form.cleaned_data['fecha_inicio']
            newCurso.fecha_fin = form.cleaned_data['fecha_fin']
            newCurso.cartel = form.cleaned_data['cartel']
            newCurso.hora_fin = form.cleaned_data['hora_fin']
            newCurso.hora_inicio = form.cleaned_data['hora_inicio']
            newCurso.save()

    return redirect('cursos_index')

@staff_member_required()
def new_curso(request):
    if request.method == "GET":
        new_curso_form = forms.CursoForm()
        context = {
            'new_curso_form': new_curso_form

        }
        return render(request, "new_curso.html", context=context)
    elif request.method == "POST":
        form = forms.CursoForm(request.POST, request.FILES)
        if form.is_valid():
            newCurso = models.Curso()
            newCurso.id = form.cleaned_data['id']
            newCurso.info = InfoCurso.objects.get(id=form.cleaned_data['info_id'])
            newCurso.fecha_inicio = form.cleaned_data['fecha_inicio']
            newCurso.fecha_fin = form.cleaned_data['fecha_fin']
            newCurso.cartel = form.cleaned_data['cartel']
            newCurso.hora_fin = form.cleaned_data['hora_fin']
            newCurso.hora_inicio = form.cleaned_data['hora_inicio']
            newCurso.save()

    return redirect('cursos_index')

@staff_member_required()
def new_infocurso(request):
    if request.method == "GET":
        new_infocurso_form = forms.InfoCursoForm()
        context = {
            'new_infocurso_form': new_infocurso_form
        }
        return render(request, "new_infocurso.html", context=context)
    elif request.method == "POST":
        form = forms.InfoCursoForm(request.POST)
        if form.is_valid():
            newInfo = models.InfoCurso()
            newInfo.id=form.cleaned_data['id']
            newInfo.nom = form.cleaned_data['nom']
            newInfo.descripcio = form.cleaned_data['descripcio']
            newInfo.save()

    return redirect('cursos_index')


def show_curso(request, curso_id):
    curso = models.Curso.objects.get(id=curso_id)
    context = {
        'curso':curso
    }
    return render(request, "curso_detalles.html", context=context)


def inscripcion(request, curso_id):
    curso = models.Curso.objects.get(id=curso_id)
    if request.method == "POST":
        form = forms.StudentForm(request.POST)
        if form.is_valid():
            newStudent = models.StudentEnrolled()
            newStudent.cursoEnrolled = curso
            newStudent.is_fiber = form.cleaned_data['is_fiber'] == "YES"
            newStudent.dni = form.cleaned_data['dni']
            newStudent.nombre = form.cleaned_data['nombre']
            newStudent.apellidos = form.cleaned_data['apellidos']
            newStudent.email = form.cleaned_data['email']
            newStudent.paymethod = form.cleaned_data['paymethod']
            comp = form.cleaned_data['companero']
            if comp != "":
                newStudent.companero = comp
                newStudent.precio = 95
                precio = """95"""
            else:
                newStudent.precio = 125
                precio = """125"""
            if newStudent.paymethod == "Paypal":
                paymethod = """contacte@vgafib.org"""
            else:
                paymethod = """ES20 3025 0011 79 1400040326"""
            mes = """Hola,

Hemos recibido tu solicitud de inscripci??n al curso. Tienes tu plaza reservada durante una semana, durante la cual puedes realizar el pago de la matr??cula.

Tu precio a pagar por la matr??cula es de """+precio+"""???, y puedes hacer el pago a:

"""+paymethod+"""


Recuerda indicar claramente tu nombre y/o DNI al realizar el pago. Es especialmente importante que conste el nombre o DNI que se ha indicado a la hora de hacer la inscripci??n para poder saber qu?? matr??cula se est?? pagando. Recomendamos que env??es un email con un recibo para confirmar el pago de forma segura y r??pida.

Cualquier duda que tengas, resp??ndeme a este mismo correo y te responder?? lo antes posible.

Recuerda que tienes una semana para hacer efectivo el pago. En caso contrario, la reserva de tu plaza se cerrar?? y tendr??s que contactarnos para abrirla de nuevo.


Atentamente,

Oriol Duran
Presidente VGAFIB"""
            student_count = models.StudentEnrolled.objects.filter(cursoEnrolled__id=curso_id).count()
            if(student_count>25):
                mes = """Hola,

Hemos recibido tu solicitud de inscripci??n al curso. 

Por desgracia ahora mismo todas las plazas disponibles est??n reservadas.

Te pondremos en una lista de espera y se te avisar?? por correo electr??nico si se libera alguna plaza.

Atentamente,

Oriol Duran
Presidente VGAFIB"""

            send_mail("Pago de la matr??cula para \'"+curso.info.nom+"\'",message=mes,from_email=None, recipient_list=[newStudent.email])

            newStudent.save()
            return redirect('cursos_index')
    else:
        form = forms.StudentForm()
        context = {
            'curso': curso,
            'student_form': form

        }
        return render(request, "inscripcion.html", context=context)
