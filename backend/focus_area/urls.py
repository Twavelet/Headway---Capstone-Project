from django.urls import path, include
from focus_area import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.post_user_focus_area),   
    path('get/<int:pk>/', views.get_user_focus_area),
    path('put/<int:pk>/', views.edit_user_focus_area),   
    path('delete/<int:pk>/', views.delete_user_focus_area)   
  
]