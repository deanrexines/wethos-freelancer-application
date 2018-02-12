from rest_framework import viewsets
from .forms import FreelancerForm
from django.shortcuts import render, redirect
from django.utils import timezone
from .models import Freelancer
from django.core import serializers
from django.http import HttpResponse
from django.utils.html import escape

def create_new_freelancer(request):
    if request.method == "POST":
        form = FreelancerForm(request.POST)
        if form.is_valid():
            freelancer = form.save(commit=False)
            freelancer.save()
            return redirect('post_edit.html', pk=freelancer.pk)
    else:
        form = FreelancerForm()
    return render(request, 'post_edit.html', {'form': form})

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