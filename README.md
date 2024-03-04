Recipe Management System

Overview
This is a Recipe Management System developed using Python Flask for the server-side logic and React.js for the frontend. The system provides functionalities for users to manage their recipes, with different levels of access based on user roles.

Features

User authentication system with login and signup pages.
Differentiated access levels for users and admin.
Users can view all recipes but can't edit or delete them.
Admin can view, update, and delete recipes of all users.
Logout functionality to securely end user sessions.

Technologies Used
Python Flask for backend server logic.
React.js for frontend development.
SQL database for storing recipe records.

File Structure\


|--Backend
|   |__server.py         # Main Python Flask server file containing routes
├── frontend            # Frontend directory      
│   └── src             # React.js source files  # React.js components (e.g., home, login, signup, main)
├── database.sql        # SQL file for database schema
└── README.md           # You are here!


Setup Instructions

Clone the repository: git clone https://github.com/ManiPanchal/python.git
Navigate to the Backend directory: cd backend

Set up the virtual environment for Python
install the following:pip install flask requests pyjwt flask_cors
Set up the database: Execute the SQL script database.sql to create the necessary tables.
Start the server: python server.py

Navigate to the frontend directory:cd frontend
run :npm run dev

Navigate to http://locathost:5173 in your browser to access the application

Usage

Register a new account using the signup page.
Log in with your credentials on the login page.
Explore recipes on the home page.
Admins can access the main page to manage recipe records.
Logout securely using the logout button.

Contributors
Manisha Panchal

Acknowledgements
Python Flask
React.js
SQL





