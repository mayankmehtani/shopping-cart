A basic shopping cart application that supports ordering shopping items utilizing the Django & React frameworks for backend and frontend development.

Create a virtual environment
```
python3 -m venv .
source bin/activate
```

Install the needed python modules from requirements.txt file, any needed migrations and then run the django application to start up the app's backend.
```
(shopping-cart) cd shopping
(shopping-cart) python3 -m pip install -r requirements.txt
(shopping-cart) python3 manage.py runmigrations
(shopping-cart) python3 manage.py runserver
```