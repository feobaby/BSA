package controllers

import (
	"errors"
	"fmt"
	"net/http"

	// "github.com/badoux/checkmail"
	"github.com/gin-gonic/gin"
	// "github.com/gomodule/redigo/redis"

	// "github.com/codeliezel/paycrow-system/api/auth"
	// "github.com/codeliezel/paycrow-system/api/db"
	// "github.com/codeliezel/paycrow-system/api/models"
	// "github.com/codeliezel/paycrow-system/api/utils"
	// "github.com/codeliezel/paycrow-system/api/validations"
)

// UserInput Struct ...
type CreateUserInput struct {
	Email       string `json:"email" binding:"required"`
	Password    string `json:"password" binding:"required"`
	Pin         string `json:"pin" binding:"required"`
	Picture     string `json:"picture" binding:"required"`
	FirstName   string `json:"first_name" binding:"required"`
	LastName    string `json:"last_name" binding:"required"`
	PhoneNumber string `json:"phone_number" binding:"required"`
	Address     string `json:"address;" binding:"required"`
	City        string `json:"city;" binding:"required"`
	State       string `json:"state;" binding:"required"`
	Country     string `json:"country;" binding:"required"`
	ZipCode     string `json:"zip_code;" binding:"required"`
	Role        string `json:"role;" binding:"required"`
	Bvn         string `json:"bvn;" binding:"required"`
}

// CreateUser ...
func CreateUser(c *gin.Context) {

	var body CreateUserInput

	c.ShouldBindJSON(&body)

	var exists models.User

	// validation to check if the requested email exists already.
	if err := db.DB.Where("email = ?", body.Email).First(&exists).Error; err == nil {
		c.Abort()
		c.JSON(http.StatusConflict, gin.H{"status": "409", "error": "Email exists already"})
		fmt.Println(body.Email)
		return
	}

	// to hash the password before sending to the db
	hash, err := utils.Hash(body.Password)
	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	user := models.User{
		Email:       body.Email,
		Password:    hash,
		Pin:         body.Pin,
		FirstName:   body.FirstName,
		LastName:    body.LastName,
		PhoneNumber: body.PhoneNumber,
		Address:     body.Address,
		City:        body.City,
		State:       body.State,
		Country:     body.Country,
		ZipCode:     body.ZipCode,
		Role:        body.Role,
	}

	switch true {

	// body validations for null values
	case (body.Email == "" || body.Password == "" || body.Pin == ""):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Email, Password or Pin is required"})

		// email validation
	case err != (checkmail.ValidateFormat(body.Email)):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Invalid email"})

		// password validation
	case err != (validations.CheckPasswordCombination(body.Password)):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Invalid password"})

		// pin validation
	case err != (validations.CheckPinLength(body.Pin)):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Invalid pin, only four numbers allowed"})

		// first name validation
	// case err != (validations.CheckFirstName(body.FirstName, body.LastName)):
	// 	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Invalid name, only letters allowed"})

	// create the body after validations are passed
	default:
		db.DB.Create(&user)
		token, _ := auth.CreateToken(user.ID)
		c.JSON(http.StatusCreated, gin.H{"data": user, "token": token})
	}
}

// LoginUserInput Struct ...
type LoginUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// Login ...
func Login(c *gin.Context) {

	var user models.User
	var body LoginUserInput
	c.ShouldBindJSON(&body)

	// validation to check if the requested email exists already.
	if err := db.DB.Where("email = ?", body.Email).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(404, gin.H{"status": 404, "error": "Email not found"})
	}

	err := true

	switch true {
	// body validations for null values
	case (body.Email == "" || body.Password == ""):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "Email or Password is required"})

	// validation to check for incorrect password
	case err != (utils.CheckHash(body.Password, user.Password)):
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": 401, "error": "Incorrect password"})

	// validation to check if the user is verified
	case err != (user.IsVerified == false):
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": 400, "error": "It seems this account has not been verified yet..."})
	default:
		token, _ := auth.CreateToken(user.ID)
		c.JSON(http.StatusOK, gin.H{"token": token})
	}
}

//  UpdateUserInput Struct ...
type UpdateUserInput struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Address   string `json:"address"`
	City      string `json:"city"`
	State     string `json:"state"`
	Country   string `json:"country"`
	ZipCode   string `json:"zip_code"`
	Role      string `json:"role"`
	Picture   string `json:"picture"`
}

// UpdateUser ...
func UpdateUser(c *gin.Context) {

	var user models.User
	var body UpdateUserInput
	c.ShouldBindJSON(&body)

	// extract token and check for access authorization
	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": 401, "error": "Unauthorized for access!"})
	}
	// to extract the id from the token and update the profile details of that particular id
	if err := db.DB.Where("id = ?", uid).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}
	fmt.Println(err)
	db.DB.Model(&user).Updates(body)
	c.JSON(http.StatusOK, gin.H{"data": user})
}

type UserR struct {
	FirstName string `redis:"first_name"`
	LastName  string `redis:"last_name"`
}

// Declare a pool variable to hold the pool of Redis connections.
var pool *redis.Pool

var ErrNoAlbum = errors.New("no album found")

// Define a custom struct to hold Album data.

// FindOneUserProfile ...

func FindOneUserProfile() gin.HandlerFunc {
	return func(c *gin.Context, *UserR, error) {

		conn := pool.Get()
		defer conn.Close()

		// var user models.User

		uid, err := auth.ExtractTokenID(c.Request)

		values, err := redis.Values(conn.Do("HGETALL", uid))
		if err != nil {
			return nil, err
		}
		var album UserR
		err = redis.ScanStruct(values, &album)
		if err != nil {
			return nil, err
		}

		return &album, nil
	}
}

// if err != nil {
// 	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": "401", "error": "Unauthorized!"})
// 	return
// }
// if err := db.DB.Where("id = ?", uid).First(&user).Error; err != nil {
// 	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "User not found!"})
// 	return
// }
// c.JSON(http.StatusOK, gin.H{"data": user})
// }