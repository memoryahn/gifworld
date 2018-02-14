from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'gif'
app.config['MONGO_HOST'] = 'mongodb://220.230.124.148:27017'
# 리눅스 셋팅
# app.config['MONGO_HOST'] = 'mongodb://127.0.0.1:27017'
app.config['MONGO_PORT'] = '27017'

mongo = PyMongo(app)

@app.route('/',methods=['GET'])
def get_gif():
    coll = mongo.db.gifcoll
    output = []
    for s in coll.find().limit(15):
        output.append(s)
    for entry in output:
        entry['_id'] = str(entry['_id'])
    return jsonify(output)

@app.route('/api/getgif/<page>',methods=['GET'])
def get_gif_count(page):                                           
    coll = mongo.db.gifcoll 
    output = []
    pageSize = 15       
    skips = (int(page)-1)*pageSize
    for s in coll.find().sort([('_id',-1)]).skip(skips).limit(pageSize):
        output.append(s)
    for entry in output:
        entry['_id'] = str(entry['_id'])
    return jsonify(output)
@app.route('/api/getgif/views/<id>',methods=['PUT'])
def add_view_count(id):
    coll = mongo.db.gifcoll
    # print('request:'+request.views)
    checkCount = coll.find_one({'_id':ObjectId(id)})
    addCount = int(checkCount['views']) + 1
    coll.update_one(
        {"_id": ObjectId(id)},
        {
            "$set":{
            "views":addCount
        }
        }
    )
    return 'ok'
@app.route('/api/getgif/addcom/<id>',methods=['PUT'])
def add_com(id):
    coll = mongo.db.gifcoll
    com = coll.find_one({'_id':ObjectId(id)})
    comlist = []
    if 'comlist' in com :
        comlist=com['comlist']
        comlist.append(request.json['comId'])
    else:
        comlist.append(request.json['comId'])
    coll.update_one(
        {"_id": ObjectId(id)},
        {
            "$set":{
            "comlist":comlist
            }
        }
    )
    return 'ok'
@app.route('/api/getgif/comment/<id>',methods=['POST'])
def comment(id):
    comcoll = mongo.db.comcoll
    articleId = id
    checkUser = request.json['checkUser']
    name = request.json['name']
    userId = request.json['userId']
    password = request.json['password']
    body = request.json['body']
    comId = comcoll.insert({'name':name,'articleId':id,'userId':userId,'body':body,
    'password':password})
    print(comId)
    return str(comId)
    
if __name__ == '__main__':
    app.run(debug=True)
    # 리눅스 셋팅
    # app.run(host='0.0.0.0',port=5000,debug=True)
