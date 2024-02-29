# Back-End written in Python.

## :rocket: Quick start

1.  Have `Git`, `Python3`, `pip` and `pipenv` installed on your computer.
2.  Clone the repo.
3.  cd into the project `bsa`, and cd into the `Back-Ends` and `Python` folders.
4.  if `pipenv` has been installed, then run `pipenv shell`, and run `pipenv install --skip-lock` 
    to install dependencies from `pipfile`.    
5.  Create a `.env` file in the folder and add the necessary variables following the _.env.sample_ format.
6.  You can do a quick database migration using the command: `python manage.py migrate`.
7.  Run `python manage.py runserver 3000` to start the backend server.

## :star: Tools used

1. Python
2. Django
3. Django Rest Framework
4. PostgreSQL

## :sunny: Sample .env file format

```
db_name=
db_user=
db_password=
SECRET=
```

## :heart: Quick note

This folder only houses the code written in Python. The APIs functionalities are all the same acrross all back-ends.
You can find more about the APIs in `Back-Ends/README.md`
