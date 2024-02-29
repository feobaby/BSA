# The BSA back-ends are written in different languages.

The point here was to comprehend the behavior of each programming language across various scenarios, including their treatment of numerical data, reliability, support for modularity, ease of use, and other factors.
All APIs behave uniformly across the board, regardless of the programming language used.

Note: Please refer to the README file located in each backend folder for instructions on setting up and utilizing the respective backend.

You can check the main README of this project to have a good grasp of what this project is about.

## The Current APIs :rocket:

### For Authentication

#### Creating a user
POST: `localhost:3000/api/v1/auth/signup`

```
{
	"email": "funmi@gmail.com",
	"password": "fun456",
	"first_name": "Funmi",
	"last_name": "Olaiya"
}
```
#### Signing in a user
POST: `localhost:3000/api/v1/auth/signin`

```
{
	"email": "funmi@gmail.com",
	"password": "fun456"
}
```
#### Ensuring a user can get their profile
Authorization: Bearer <token>
GET: `localhost:3000/api/v1/auth/profile`

#

### For Account-related purposes

#### A user can deposit money to their wallet
Authorization: Bearer <token>
PUT: `localhost:3000/api/v1/account/deposit-wallet`

```
{
	"amount": 200.00
}
```

#

### For Group-related purposes

#### A user can create a group
Authorization: Bearer <token>
POST: `localhost:3000/api/v1/group/create`

```
{
	"name": "Girls trip 2023",
	"description": "Time to have Girls fun!",
	"category": "Trips",
	"goalBalance": "1000.00",
	"groupBalance": "0",
	"emails": ["funmi@gmail.com", "fenwa@gmail.com", "giwa@gmail.com"]
}
```

#### A user can update a group they created
Authorization: Bearer <token>
PATCH: `localhost:3000/api/v1/group/update/<id>`

```
{
	"name": "Girls trip 2024",
	"description": "Time to have Girls fun!",
	"category": "Trips",
	"goalBalance": "1000.00",
	"groupBalance": "0",
	"emails": ["funmi@gmail.com", "fenwa@gmail.com", "giwa@gmail.com", "tade@gmail.com"]
}
```

#### A user can get all groups they have created
Authorization: Bearer <token>
GET: `localhost:3000/api/v1/group/user`

#### A user can get a group they created
Authorization: Bearer <token>
GET: `localhost:3000/api/v1/group/<group-id>`

#### A user can get all groups they are part of
Authorization: Bearer <token>
GET: `localhost:3000/api/v1/group?email=<user-email>`

#### A user that is part of a group can deposit any amount of money to the group
Authorization: Bearer <token>
PUT: `localhost:3000/api/v1/group/deposit-group/<group-id>`

```
{
	"amount": 50.00
}
```

#

### For Transaction-related purposes

#### A user can get a list of all their transactions (be it wallet or group deposit)
Authorization: Bearer <token>
GET: `localhost:3000/api/v1/transaction`
