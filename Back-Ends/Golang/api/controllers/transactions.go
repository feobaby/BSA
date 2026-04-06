package controllers

import (
	"net/http"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/auth"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/utils"
	"github.com/gin-gonic/gin"
)

func FetchUserTransactions(c *gin.Context) {
	var transactions []models.Transaction
	var uid uint32
	var err error

	uid, err = auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	}
	if err := database.DB.Where("user_id = ?", uid).Find(&transactions).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": err.Error()})
		return
	}
	rowsReturned := len(transactions)
	c.AbortWithStatusJSON(http.StatusOK, gin.H{"status": http.StatusOK, "count": rowsReturned, "data": transactions})
}
