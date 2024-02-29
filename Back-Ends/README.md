# The Back-Ends BSA are written in different languages.

The point here was to comprehend the behavior of each programming language across various scenarios, including their treatment of numerical data, reliability, support for modularity, ease of use, and other factors.
All APIs behave uniformly across the board, regardless of the programming language used.
Note: Please refer to the README file located in each backend folder for instructions on setting up and utilizing the respective backend.

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
GET: `localhost:3000/api/v1/auth/profile`

#

### For Account-related purposes

#### A user can deposit money to their wallet
PUT: `localhost:3000/api/v1/account/deposit-wallet`

```
{
	"amount": 200.00
}
```