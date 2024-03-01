from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import mysql.connector
mysql=mysql.connector.connect(
    host="localhost",
    user="root",
    database="management_recipe"
)
cursor=mysql.cursor()
app = Flask(__name__)
cors=CORS(app)
@app.route('/login', methods=['POST'])
@cross_origin(origins=[u"*"])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username=data.get('name')
    if not email or not password or not username:
        return jsonify({'error': 'Please provide complete information'}), 400
    cursor.execute("select * from users where email=%s and pass_word=%s and username=%s",(email,password,username))
    data=cursor.fetchall()
    if data:
        # print(data)
        return jsonify({'data':data}),200
    else:
        return jsonify({'message':'Not exist'}),201
    
@app.route('/signup', methods=['POST'])
@cross_origin(origins=[u"*"])
def signup():
    data = request.get_json()
    # print(data)
    email = data.get('email')
    password = data.get('password')
    username=data.get('name')
    # print(email,password,username)
    if not email or not password or not username:
        return jsonify({'error': 'Please provide complete information'}), 400
    cursor.execute("select * from users where email=%s",(email,))
    data=cursor.fetchall()
    if data:
        return jsonify({'message':'User already exist'}),201
    else:
        cursor.execute("insert into users values (%s,%s,%s,%s)",(username,email,password,"user"))
        mysql.commit()
        return jsonify({'message':'Sign up successful'}),200
    
@app.route('/viewall', methods=['POST'])
@cross_origin(origins=[u"*"])
def viewall():
    data = request.get_json()
    # print(data)
    email = data.get('email')
    cursor.execute("select * from recipe")
    data=cursor.fetchall()
    if data:
        return jsonify({'data':data}),200
    else:
        return jsonify({'error':'nothing'}),201
    
@app.route('/insert', methods=['POST'])
@cross_origin(origins=[u"*"])
def insert():
    data = request.get_json()
    # print(data)
    email = data.get('email')
    name=data.get('name')
    ingredients=data.get('ingredients')
    instruction=data.get('instruction')
    time=data.get('time')
    rating=data.get('rating')
    catagory=data.get('catagory')
    sql = "INSERT INTO recipe (recipe_name, ingredients,catagory,instructions,cooking_time,rating,user_id) VALUES (%s, %s,%s,%s,%s,%s,%s)"
    val = (name,ingredients,catagory,instruction,time,rating,email)
            # mycursor.execute(sql, val)
    cursor.execute(sql,val)
    mysql.commit()
    return jsonify({'message':'success'}),200
    # if data:
    # else:
        # return jsonify({'error':'nothing'}),201
@app.route('/deleteone', methods=['POST'])
@cross_origin(origins=[u"*"])
def delete():
    data=request.get_json()
    email=data.get('email')
    id=data.get('id')
    if check(id,email):
       sql = "delete from recipe where id=%s and user_id=%s"
       val = (id,email)
       cursor.execute(sql,val)
       mysql.commit()
       return jsonify({'message':'success'}),200
    else:
       return jsonify({'message':'not valid'}),201

@app.route('/check',methods=['POST'])
@cross_origin(origins=[u"*"])
def check():
    data=request.get_json()
    email=data.get('email')
    id=data.get('id')
    if check(id,email):
        return jsonify({'message':'found'}),200
    else:
        return jsonify({'message':'not fount'}),201
@app.route('/updateone',methods=['POST'])
def updateone():
    data=request.get_json()
    print(data)
    email = data.get('email')
    name=data.get('name')
    ingredients=data.get('ingredients')
    instruction=data.get('instruction')
    time=data.get('time')
    rating=data.get('rating')
    catagory=data.get('catagory')
    email=data.get('email')
    id=data.get('id')  
    sql="update recipe set {}=%s,{}=%s,{}=%s,{}=%s,{}=%s,{}=%s where id=%s and user_id=%s".format("recipe_name","ingredients","catagory","instructions","cooking_time","rating")
    val = (name,ingredients,catagory,instruction,time,rating,id,email)
    cursor.execute(sql,val)
    mysql.commit()
    return jsonify({"message":"success"}),200
def check(id,email):
        sql = "Select * from recipe where id=%s and user_id=%s"
        val = (id,email)
            # mycursor.execute(sql, val)
        cursor.execute(sql,val)
        data=cursor.fetchall()
        # print(data)
        if data:
            return 1
        else:
            return 0
        
if __name__ == '__main__':
    app.run(debug=True)
