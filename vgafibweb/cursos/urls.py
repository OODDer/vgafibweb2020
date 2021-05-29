from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='cursos_index'),
    path('new_infocurso/', views.new_infocurso, name='new_infocurso'),
    path('new_curso/', views.new_curso, name='new_curso'),
    path('curso/<int:curso_id>/', views.show_curso, name='show_curso'),
    path('inscripcion/<int:curso_id>', views.inscripcion, name='inscripcion')
]