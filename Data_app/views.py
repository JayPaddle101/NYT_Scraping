from django.core import serializers
from django.shortcuts import render
from .models import *
import json


# Create your views here.

def data_view(request):
    # Fetch all HitData objects with the title 'Generic'
    generic_hits = HitData.objects.filter(title='Generic')

    # Serialize the queryset to JSON
    generic_hits_json = serializers.serialize('json', generic_hits)

    # Create context dictionary to send data to the template
    context = {
        'generic_hits_json': generic_hits_json,
        'generic_hits': generic_hits,
    }
    

    return render(request, 'data.html', context)
