Create a virtual environment and install requirements first
```
python3 -m venv .
source bin/activate
```

Install the needed python modules from requirements.txt file and then run the django application
```
cd shopping
python3 -m pip install -r requirements.txt
python3 manage.py runserver
```