from django.shortcuts import render
from pymongo import MongoClient

# from django.http import HttpResponse

def index(request):    
    client = MongoClient("mongodb://220.230.124.148:27017")
    db = client.gif
    gifcoll = db.gifcoll
    data = gifcoll.find() 
    client.close()
    return render(request, 'index.html', {'data':data})

