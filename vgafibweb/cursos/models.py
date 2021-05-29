from django.db import models

# Create your models here.




class InfoCurso(models.Model):
    id = models.IntegerField(primary_key=True)
    descripcio = models.TextField()
    nom = models.CharField(max_length=50)


class Curso(models.Model):
    id = models.IntegerField(primary_key=True)
    info = models.ForeignKey(InfoCurso, on_delete=models.DO_NOTHING)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    cartel = models.ImageField(upload_to='carteles/')




class StudentEnrolled(models.Model):
    dni = models.IntegerField()
    cursoEnrolled = models.ForeignKey(Curso, on_delete=models.DO_NOTHING)
    nombre = models.CharField(max_length=15)
    apellidos = models.CharField(max_length=30)
    email = models.EmailField()
    companero = models.CharField(max_length=45)
    paymethod = models.CharField(max_length=15)
    is_fiber = models.BooleanField()
    precio = models.IntegerField()
    class Meta:
        unique_together = ("dni", "cursoEnrolled")
