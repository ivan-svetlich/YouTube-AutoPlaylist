import os

import flask
from flask_caching import Cache
from flask_cors import CORS

app = flask.Flask(__name__)
cache = Cache(app, config={
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 1800,
    'CACHE_REDIS_HOST': 'localhost',
    'CACHE_REDIS_PORT': '6379',
    'CACHE_REDIS_URL': 'redis://localhost:6379'
})
app.secret_key = os.environ['APP_SECRET_KEY']
CORS(app, support_credentials=True)
