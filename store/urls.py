from django.urls import path

from . import views
from store.controllers import authview

urlpatterns = [
    path('', views.home, name="home"),
    path('betplace/', views.betplace, name="betplace"),

    path('register/', authview.register, name="register" ),
    path('login/', authview.loginpage, name="loginpage"),
    path('logout/', authview.logoutpage, name="logout"),
    path('contact/', views.contact, name='contact'),
    
]