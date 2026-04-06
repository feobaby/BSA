package controllers

import (
	"fmt"
	"net/http"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/auth"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/utils"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var inputUser structs.CreateUserInput
	var inputAccount structs.CreateAccountInput

	if err := c.ShouldBindJSON(&inputUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hash, err := utils.GeneratePasswordHash(inputUser.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.ServerError})
		return
	}

	userData := models.User{
		Email:     inputUser.Email,
		Password:  hash,
		FirstName: inputUser.FirstName,
		LastName:  inputUser.LastName,
		Role:      "user",
	}
	userResult := database.DB.Create(&userData)
	if userResult.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.ServerError})
		return
	}
	accountData := models.Account{
		Balance: inputAccount.Balance,
		UserId:  userData.ID,
	}
	accountResult := database.DB.Create(&accountData)
	if accountResult.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.ServerError})
		return
	}
	token, err := auth.CreateToken(userData.ID)
	if err != nil {
		fmt.Printf("Error creating token: %v\n", err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "token": token, "createUser": userData, "createUserAccount": accountData})
}

func LoginUser(c *gin.Context) {
	var user models.User
	var input structs.LoginUserInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} else if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "error": utils.EmailNotFound})
		return
	} else if match := utils.ComparePasswordHash(input.Password, user.Password); !match {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.IncorrectPassword})
		return
	}
	token, err := auth.CreateToken(user.ID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.TokenError})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": utils.SuccessLogin, "token": token})
}

func FetchUserProfile(c *gin.Context) {
	var user_profile models.User
	var uid uint32
	var err error

	uid, err = auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	} else if err := database.DB.First(&user_profile, uid).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": utils.UserNotFound})
		return
	}
	c.AbortWithStatusJSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": user_profile})
}
