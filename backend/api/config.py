# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

import os
from datetime import timedelta

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig():

    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'athena2022.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "athena2022"
    JWT_SECRET_KEY = "athena2022"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
