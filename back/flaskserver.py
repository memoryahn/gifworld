from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'gif'
app.config['MONGO_HOST'] = 'mongodb://220.230.124.148:27017'
app.config['MONGO_PORT'] = '27017'

mongo = PyMongo(app)

@app.route('/',methods=['GET'])
def get_gif():
    coll = mongo.db.gifcoll
    output = []
    for s in coll.find().limit(10):
        output.append(s)
    for entry in output:
        entry['_id'] = str(entry['_id'])
    return jsonify(output)

@app.route('/api/getgif/<count>',methods=['GET'])
def get_gif_count(count):                                           
    coll = mongo.db.gifcoll 
    output = []                             
    for s in coll.find().limit(int(count)):
        output.append(s)
    for entry in output:
        entry['_id'] = str(entry['_id'])
    return jsonify(output)

if __name__ == '__main__':
    app.run(debug=True)