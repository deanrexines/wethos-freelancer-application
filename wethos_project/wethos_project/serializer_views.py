from rest_framework import viewsets
from .forms import FreelancerForm
from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Freelancer
from django.core import serializers
from django.http import HttpResponse
from django.utils.html import escape
from django.views.decorators.csrf import csrf_exempt

def create_new_freelancer(request):
    if request.method == "POST":
        form = FreelancerForm(request.POST)
        if form.is_valid():
            freelancer = form.save(commit=False)
            freelancer.save()
            return HttpResponse(status=200)
    else:
        form = FreelancerForm()
    return HttpResponse(status=200)

def get_freelancers(request):
    all_freelancers = Freelancer.objects.all()
    return render(request, 'base.html', {'freelancers_list': all_freelancers})

def get_request_freelancers(request):
    if request.method == "GET":
        all_objects = list(Freelancer.objects.all())
        data = serializers.serialize('json', all_objects)
        bytes = data.encode('utf-8')
        return HttpResponse(bytes, content_type='application/json')

def get_request_freelancer_by_id(request, pk):
    if request.method == "GET":
        obj = Freelancer.objects.filter(pk=pk)
        data = serializers.serialize('json', obj)
        bytes = data.encode('utf-8')
        return HttpResponse(bytes, content_type='application/json')

@csrf_exempt
def approve_freelancer(request, approved, pk):
    if request.method == "POST":
        obj_to_update = Freelancer.objects.get(pk=pk)
        approved_final = True if int(approved) == 1 else False
        obj_to_update.approved = approved_final
        obj_to_update.save()
        return HttpResponse(status=200)