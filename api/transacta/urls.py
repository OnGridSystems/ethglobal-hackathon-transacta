from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('tokens', views.TokenView)

urlpatterns = [
    path('', include(router.urls)),
]
