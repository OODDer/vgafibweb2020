from django import forms
from django.forms.widgets import (
    FILE_INPUT_CONTRADICTION, CheckboxInput, ClearableFileInput, DateInput,
    DateTimeInput, EmailInput, FileInput, HiddenInput, MultipleHiddenInput,
    NullBooleanSelect, NumberInput, Select, SelectMultiple,
    SplitDateTimeWidget, SplitHiddenDateTimeWidget, TextInput, TimeInput,
    URLInput,
)
from . import models

PAYMETHODS = [
    ("Paypal", "Paypal"),
    ("Transferencia", "Transferencia")
]
BCHOICES = [ #Esto funciona para un bool, no uso booleanfield porque parece que el required=false no le funciona
    ("NO", "NO"),
    ("YES", "YES")
]

class CursoForm(forms.Form):
    cartel = forms.ImageField()
    id = forms.IntegerField()
    info_id = forms.IntegerField()
    fecha_inicio = forms.DateField(widget=DateInput)
    fecha_fin = forms.DateField(widget=DateInput)
    hora_inicio = forms.TimeField(widget=TimeInput)
    hora_fin = forms.TimeField(widget=TimeInput)


class InfoCursoForm(forms.Form):
    id = forms.IntegerField()
    nom = forms.CharField()
    descripcio = forms.CharField(widget=TextInput)

class StudentForm(forms.Form):
    dni = forms.IntegerField(label="DNI sin la letra")
    nombre = forms.CharField(label="Nombre" )
    apellidos = forms.CharField(label="Apellidos")
    email = forms.EmailField(label="Dirección de Correo Electrónico")
    companero = forms.CharField(label="Nombre del Compañero", required=False)
    paymethod = forms.ChoiceField(choices=PAYMETHODS,label="Método de Pago")
    is_fiber = forms.ChoiceField(choices=BCHOICES, label="Eres Estudiante en la FIB")
