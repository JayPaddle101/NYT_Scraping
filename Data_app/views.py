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

def data1_view(request):

    # Fetch all HitData objects with the title 'Generic' and 'Meta_Metaverse_hits'
    generic_hits = HitData.objects.filter(title='Generic')
    meta_meteverse_hits = HitData.objects.filter(title='Meta_Metaverse_hits')

    # Serialize the queryset's to JSON
    generic_hits_json = serializers.serialize('json', generic_hits)
    meta_meteverse_hits_json = serializers.serialize('json', meta_meteverse_hits)

    context = {
        'meta_meteverse_hits': meta_meteverse_hits,
        'generic_hits': generic_hits,
        'generic_hits_json': generic_hits_json,
        'meta_meteverse_hits_json': meta_meteverse_hits_json,
    }

    return render(request, 'data1.html', context)
