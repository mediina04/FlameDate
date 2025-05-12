import os

class Config:
    SECRET_KEY = 'Asdqwe!23'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost/flamedate'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
