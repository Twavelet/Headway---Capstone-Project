from django.urls import path, include
from progress_tracker import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('get/', views.get_user_progress)
    ]