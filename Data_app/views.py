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

def data2_view(request):

     # Fetch all HitData objects with the title 'Generic'
    generic_hits = HitData.objects.filter(title='Apple_SC_hits')

    # Serialize the queryset to JSON
    generic_hits_json = serializers.serialize('json', generic_hits)

    # Create context dictionary to send data to the template
    context = {
        'generic_hits_json': generic_hits_json,
        'generic_hits': generic_hits,
    }

    
    return render(request, 'data2.html', context)

def data3_view(request):
    apple_sc_hits = {"date": "2023-06", "hits": 10}
    meta_metaverse_hits = {"date": "2021-10", "hits": 25}

    # Convert data to JSON
    apple_sc_hits_json = json.dumps(apple_sc_hits)
    meta_metaverse_hits_json = json.dumps(meta_metaverse_hits)

    context = {
        'apple_sc_hits_json': apple_sc_hits_json,
        'meta_metaverse_hits_json': meta_metaverse_hits_json
    }

    return render(request, 'data3.html', context)


   




