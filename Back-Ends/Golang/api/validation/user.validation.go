package validation

import (
	"net/http"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/gin-gonic/gin"
)

func ValidateUserEmail(c *gin.Context) {

	var body structs.CreateUserInput
	var exists models.User
	c.ShouldBindJSON(&body)

	var err = database.DB.Where("email = ?", body.Email).First(&exists).Error; 
	  if err == nil {
		c.AbortWithStatusJSON(http.StatusConflict, gin.H{"status": http.StatusConflict, "error": "This email exists already."})
		return
	}
}