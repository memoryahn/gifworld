from django.shortcuts import render
from pymongo import MongoClient
from django.http import JsonResponse
from django.http import HttpResponse
# import json
# from django.http import HttpResponse
# from bson import ObjectId
from bson.json_util import dumps
from datetime import date, datetime

# class JSONEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, ObjectId) :
#             return str(o)
#         if isinstance(o, (datetime, date)):
#             return o.isoformat()
#         return json.JSONEncoder.default(self, o)

def index(request):    
    client = MongoClient("mongodb://220.230.124.148:27017")
    db = client.gif
    gifcoll = db.gifcoll
    data = list(gifcoll.find())
    count = gifcoll.find().count
    client.close()    
    data.reverse()
    return render(request, 'index.html', {'data':data,'count':count})

def getgif(request):
    client = MongoClient("mongodb://220.230.124.148:27017")
    db = client.gif
    gifcoll = db.gifcoll
    data = list(gifcoll.find())
    # count = gifcoll.find().count
    client.close()    
    data.reverse()  
    # jj = dict(data)
    # json.dumps(jj)
    # print(jj)
    for entry in data:
        entry['_id'] = str(entry['_id'])
    return JsonResponse(data,safe=False)
    # return HttpResponse(dumps(data))
    # return render(request, 'index.html', {'data':data,'count':count})
    

