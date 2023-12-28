package controllers

import (
	"net/http"

	"github.com/feobaby/bsa/api/auth"
	db "github.com/feobaby/bsa/api/database"
	"github.com/feobaby/bsa/api/models"
	"github.com/feobaby/bsa/api/structs"
	"github.com/feobaby/bsa/api/utils"
	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {

	var body structs.CreateUserInput

	c.ShouldBindJSON(&body)

	var hash, error = utils.Hash(body.Password)
	if error != nil {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"status": http.StatusConflict})
		return
	}

	user := models.User{
		Email:       body.Email,
		Password:    hash,
		FirstName:   body.FirstName,
		LastName:    body.LastName,
		Role:        "user",
	}
		result := db.DB.Create(&user)
		token, _ := auth.CreateToken(user.ID)
		c.JSON(http.StatusCreated, gin.H{"data": result, "token": token})
	}
