from django.urls import path, include
from progress_tracker import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('get/', views.get_user_progress),
    path('post/', views.post_user_progress),
    path('put/<int:pk>/', views.edit_user_progress),
    path('delete/<int:pk>/', views.delete_user_progress)
    ]