from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from SimilarImagesP import getSimilarImages

PORT = 3030
HOST = '0.0.0.0'
DATA = "THIS is data"
todos = {}


app = Flask(__name__)
api = Api(app)


class SimilarImagesP(Resource):
    def get(self):
        result = {}
        data = request.get_json()
        print(data)
        print(type(data))
        print(data['images'])
        result = getSimilarImages(data['images'])
        return jsonify(result)


class test(Resource):
    def get(self):
        return jsonify({'message': 'test'})

    def post(self):
        a = request.get_json()
        print(a)
        for i in a:
            print(i)
        return {"Status": 200}


api.add_resource(SimilarImagesP, '/getsimilarimg')
api.add_resource(test, '/test')


if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=PORT, debug=True)
