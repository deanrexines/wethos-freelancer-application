from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from . import serializer_views


router = routers.DefaultRouter()

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^register/$', serializer_views.create_new_freelancer, name='create_new_freelancer'),
    url(r'^freelancers/$', serializer_views.get_freelancers, name='get_freelancers'),
    url(r'^getfreelancers/$', serializer_views.get_request_freelancers, name='get_request_freelancers'),
    url(r'^getfreelancers/(?P<pk>[0-9]+)/$', serializer_views.get_request_freelancer_by_id, name='get_request_freelancer_by_id')
]