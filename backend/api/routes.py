# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from datetime import datetime, timezone, timedelta

from functools import wraps

from flask import request,jsonify
from flask_restx import Api, Resource, fields

import jwt
import os
import sqlite3

from .models import db, Users, JWTTokenBlocklist, Children
from .config import BaseConfig

rest_api = Api(version="1.0", title="Users API")


path = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(path, 'athena2022.db')

"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

login_model = rest_api.model('LoginModel', {"email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=4, max_length=16)
                                            })

user_edit_model = rest_api.model('UserEditModel', {"userID": fields.String(required=True, min_length=1, max_length=32),
                                                   "username": fields.String(required=True, min_length=2, max_length=32),
                                                   "email": fields.String(required=True, min_length=4, max_length=64)
                                                   })




"""
   Helper function for JWT token required
"""

def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""


@rest_api.route('/api/users/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        new_user = Users(username=_username, email=_email)

        new_user.set_password(_password)
        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        new_user.set_jwt_auth_active(True)

        new_user.save()

        return {"success": True,
                "userID": new_user.id,
                "token": token,
                "user": new_user.toJSON(),
                "msg": "The user was successfully registered"}, 200


@rest_api.route('/api/users/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200


@rest_api.route('/api/users/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")

        if _new_username:
            self.update_username(_new_username)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/users/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200


@rest_api.route('/api/friend-list')
class FriendList(Resource):

    #@token_required
    def get(self):
        #location=request.form.get('bike_id')

        with sqlite3.connect(db_path) as db:
            cursor=db.cursor()

        cursor.execute('SELECT users.username as username,users.location as location,users.email as email,children.gender as gender,children.age as age, children.english as english FROM children JOIN users ON children.parent_id=users.id')
        rows = cursor.fetchall()

        db.close()
        return jsonify(rows)


@rest_api.route('/api/update-user')
class UpdateParent(Resource):

    @token_required
    def post(self,current_user):

        req_data = request.get_json()

        _new_identity = req_data.get("identity")
        _new_fullname = req_data.get('fullname')
        _new_location=req_data.get('location')
        _new_nofchild=req_data.get('n_of_child')

        if _new_identity:
            self.update_identity(_new_identity)

        if _new_fullname:
            self.update_fullname(_new_fullname)

        if _new_location:
            self.update_location(_new_location)
        
        if _new_nofchild:
            self.update_nofchild(_new_nofchild)

        self.save()

        return {"success": True}, 200



@rest_api.route('/api/add-child')
class AddChild(Resource):
    
    @token_required
    def post(self,current_user):
        #fullname=request.form.get('fullname')
        #age=request.form.get('age')
        #gender=request.form.get('gender')
        #english=request.form.get('english')
        
        #with sqlite3.connect(db_path) as db:
        #    cursor=db.cursor()
        
        #cursor.execute("INSERT INTO children (fullname, age, gender, english) values(?,?,?,?)",(fullname, age, gender, english))
        #db.commit()
        #db.close()
        #return jsonify({"status":"success"})
        # add child form - fullname, age, gender, canSpeakEng checkbox.
        req_data = request.get_json()
        _parent_id = req_data.get("userid") 
        _fullname = req_data.get("childFullname")
        _age = req_data.get("childAge")
        _gender = req_data.get("gender")
        _english = req_data.get("speakEenglish")

        new_child = Children(parent_id = _parent_id, fullname=_fullname, age=_age, gender=_gender, english=_english)
        
        new_child.save()

        return {"success": True,
                "msg": "The child was successfully added"}, 200