import requests
from bs4 import BeautifulSoup
import random
import mysql.connector
mysql=mysql.connector.connect(
    host="localhost",
    user="root",
    database="management_recipe"
)
cursor=mysql.cursor()
class Recipe:
    def __init__(self,name,instructions,catagory,ingredients,time):
        self.name=name
        self.ingredients=ingredients
        self.catagory=catagory
        self.time=time
        self.rating=random.randrange(1, 5)
        self.instruction=instructions
        demo={"Name":self.name,
              "Ingredients":self.ingredients,
              "Catagory":self.catagory,
              "Instructions":self.instruction,
              "Time":self.time,
              "Rating":self.rating}
        recipes.append(demo)
    def store_in_database(self):
        for r in recipes:
            # print(r["Name"])
            sql = "INSERT INTO recipe (recipe_name, ingredients,catagory,instructions,cooking_time,rating) VALUES (%s, %s,%s,%s,%s,%s)"
            val = (r["Name"], r["Ingredients"],r["Catagory"],r["Instructions"],r["Time"],r["Rating"])
            # mycursor.execute(sql, val)
            cursor.execute(sql,val)
        mysql.commit()
    def show_all(self):
        # stored_recipe=[]
        cursor.execute("select * from recipe")
        data=cursor.fetchall()
        for x in data:
            print({"id":x[0],
                "Name":x[1],
              "Ingredients":x[2],
              "Catagory":x[3],
              "Instructions":x[4],
              "Time":x[5],
              "Rating":x[6]})
            # demo={"id":x[0],
            #     "Name":x[1],
            #   "Ingredients":x[2],
            #   "Catagory":x[3],
            #   "Instructions":x[4],
            #   "Time":x[5],
            #   "Rating":x[6]}
            # stored_recipe.append(demo)
            # print(x)
        # print(data); 
        # print(recipes) 
        # print(stored_recipe)
    def insert_new(self):
        sql = "INSERT INTO recipe (recipe_name, ingredients,catagory,instructions,cooking_time,rating) VALUES (%s, %s,%s,%s,%s,%s)"
        val = (self.name,self.ingredients,self.catagory,self.instruction,self.time,self.rating)
            # mycursor.execute(sql, val)
        cursor.execute(sql,val)
        mysql.commit()   
        print("Inserted successfully") 
    def check(self,id):
        sql = "Select * from recipe where id=%s"
        val = (id,)
            # mycursor.execute(sql, val)
        cursor.execute(sql,val)
        data=cursor.fetchall()
        # print(data)
        if data:
            return 1
        else:
            return 0
    def delete_one(self,id):
        sql = "delete from recipe where id=%s"
        val = (id,)
        cursor.execute(sql,val)
        mysql.commit()
        print("deleted successfully")
    def update_one(self,id,column,value):
        sql="update recipe set {}=%s where id=%s".format(column)
        val=(value,id)
        cursor.execute(sql,val)
        mysql.commit()
        print("Updated successfully")
recipes=[]
# stored_recipe=[]
url="https://fnec.cornell.edu/for-participants/recipe-table/"
data=requests.get(url)
soup = BeautifulSoup(data.content, 'html.parser') 
table=soup.find('table')
row=[]
for row in table.find_all('tr')[1:11]:
    cells=row.find_all(['th','td'])
    # print(cells)
    row_data = [cell.get_text(strip=True) for cell in cells]
    # print(row_data)
    # for cell in cells:
    #     row_data=cell.get_text(strip=True)
    name=row_data[0]
    instruction=row_data[1]
    catagory=row_data[2]
    ingredients=row_data[3]
    time=row_data[4]
    rating=row_data[5]
    obj=Recipe(name,instruction,catagory,ingredients,time)  
    # recipes.append(obj)
    
    # obj.print_data()    
    # print(recipes)   
# obj.print_data()
# obj.store_in_database()
# obj.show_all()
while(1):
    choice=input("""Enter choice:
                    1.To Insert
                    2.To Delete 
                    3.To update
                    4.View All
                    5.Exit
                 """)
    if choice=="1":
        name=input("Enter Name of recipe:")
        ingre=input("Enter Ingredients:")
        cata=input("Enter Catagory:")
        instru=input("Enter Instructions:")
        time=input("Enter Time:")
        obj2=Recipe(name,instru,cata,ingre,time)
        obj2.insert_new()
    elif choice=="2":
        recipe_id=int(input("Enter the id of recipe that you want to delete:"))
        value=obj.check(recipe_id)
        if value==1:
            obj.delete_one(recipe_id)
        else:
            print("Recipe is not exist")   
    elif choice=="3":
        recipe_id=int(input("Enter the id of recipe that you want to update:"))
        value=obj.check(recipe_id)
        if value==1:
            update=input("""Enter what you want to update:
                            1.Recipe Name
                            2.Recipe Ingredients
                            3.Recipe Instructions
                            4.Recipe Catagory
                            5.Recipe cooking Time
                            6.Recipe Rating
                         """) 
            if update=="1":
                new_name=input("Enter New name of recipe:")
                obj.update_one(recipe_id,"recipe_name",new_name)
            elif update=="2":
                new_ingre=input("Enter the New Ingredients:")
                obj.update_one(recipe_id,"ingredients",new_ingre)
            elif update=="3":
                new_instru=input("Enter New Instruction:")
                obj.update_one(recipe_id,"instructions",new_instru)
            elif update=="4":
                new_catagory=input("Enter new catagory:")
                obj.update_one(recipe_id,"catagory",new_catagory)
            elif update=="5":
                new_time=input("Enter the cooking time:")
                obj.update_one(recipe_id,"cooking_time",new_time)
            elif update=="6":
                new_rating=input("Enter the Rating:")
                obj.update_one(recipe_id,"rating",new_rating)
            else:
                print("Wrong choice")
        else:
            print("Recipe not exist")
    elif choice=="4":
        obj.show_all()
    elif choice=="5":
        break
    else:
        print("Wrong choice")
    


    