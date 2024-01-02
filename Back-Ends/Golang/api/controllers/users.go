package controllers

import (
	"net/http"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/auth"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/utils"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {

	var body structs.CreateUserInput

	c.ShouldBindJSON(&body)

	var hash, error = utils.Hash(body.Password)
	if error != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized})
		return
	}

	user := models.User{
		Email:       body.Email,
		Password:    hash,
		FirstName:   body.FirstName,
		LastName:    body.LastName,
		Role:        "user",
	}
		var result = database.DB.Create(&user)
		token, _ := auth.CreateToken(user.ID)

		if(result.Error != nil){
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "message": "Soemthing happened.. account can not be created"})
			return
		   } 
		c.JSON(http.StatusCreated, gin.H{"data": user, "token": token})
	}
