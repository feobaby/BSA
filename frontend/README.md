# Bill Sharing App

<p> A simple project that allows friends share bills together.</p>

## :rocket: Quick start

1.  Have Git and Node.js installed on your computer.
2.  Clone the repo.
3.  cd into the project and cd into both `backend` and `frontend` folders to install the dependencies using `npm install`.
4.  In the `backend` folder, remember to migrate and seed important files using `npm run migrate` and `npm run seed`.
5.  Create a .env file in the backend folder and add the necessary variables following the _.env.sample_ format.
6.  Run `npm run start:dev` to start the backend server.
7.  Run `yarn start` to power the frontend.

## :star: Technologies Used

1. Node.js & Expressjs
2. React
3. Postgres

## :sunny: Sample .env file format

```

SECRET=
DEV_DATABASE_URL = postgres://<pg-user>:<pg-pass>@localhost:5432/<pg-database>

```

## Available Backend APIs

<h4>1. To sign up:</h4>
   
POST `localhost:3000/api/v1/auth/user`

```

    {
        "email": "funmi@google.com",
        "password": "fff.H7",
        "firstName": "Funmilayo",
        "lastName": "Olaiya"
    }

```

#

<h4>2. To sign in:</h4>
   
POST `localhost:3000/api/v1/auth/signin`

```

    {
        "email": "funmi@google.com",
        "password": "fff.H7"
    }

```

#

<h4>3. To get account:</h4>
   
GET `localhost:3000/api/v1/account`
Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>4. To update your account:</h4>
   
PATCH `localhost:3000/api/v1/account` 

```

    {
        "firstName": "Funmilayto",
        "lastName": "Olaiya",
        "currency": "USD"
    }

```
Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>5. To add money to personal balance:</h4>
   
PATCH `localhost:3000/api/v1/add-money` 

```

    {
        "balance": 0  // get the present balance you have
        "amount": 5000.00,
    }

```
Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>6. You can always create a group:</h4>

Note: if you are creating a group, make sure to add your email too.

POST `localhost:3000/api/v1/create-group` 

```

    {
        "emails": ["dele@google.co", "feyi@gmail.co", "ufuoma@gmail.com"],
        "category": "Functions",
        "name": "Money Movers",
        "description": "Let us donate to give Bayo a brand new car.",
        "goalBalance": 500.00, // the exact money you wish to accumulate
        "groupBalance": 0
    }


```
Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>7. You can update a group:</h4>
   
PATCH `localhost:3000/api/v1/group/:id` 

```

    {
        "emails": ["dele@google.co", "feyi@gmail.co", "ufuoma@gmail.com"],
        "category": "Functions",
        "name": "Money Movers",
        "description": "Let us donate to give Bayo a brand new car.",
        "goalBalance": 1000.00, // the exact money you wish to accumulate
        "groupBalance": 0
    }


```
Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>8. You can get a group:</h4>
   
GET `localhost:3000/api/v1/group/:id` 

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>9. You can get all groups:</h4>
   
GET `localhost:3000/api/v1/groups` 

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.


#

<h4>10. You can get all groups:</h4>
   
GET `localhost:3000/api/v1/groups` 

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.


#

<h4>11. You can get all groups you are currently part of:</h4>
   
GET `localhost:3000/api/v1/group?email=` 

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>12. You can deposit money towards the goals in a group:</h4>
   
PATCH `localhost:3000/api/v1/group/add-money/:id` 

```

    {
        "balance": 4600.00,
        "goalBalance": 2000.00,
        "groupBalance": 700.00,
        "amount": 400.00
    }

```

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.

#

<h4>13. You can delete a group:</h4>
   
DELETE `localhost:3000/api/v1/group/:id` 

Note: copy the `token` gotten from the sign up/in response and add it to the Bearer `token` field in postman.