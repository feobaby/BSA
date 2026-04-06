package controllers

import (
	"net/http"
	"strconv"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/auth"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/utils"
	"github.com/gin-gonic/gin"
)

func CreateGroup(c *gin.Context) {
	var inputGroup structs.CreateGroupInput

	if err := c.ShouldBindJSON(&inputGroup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	}
	groupData := models.Group{
		UserId:       uid,
		Name:         inputGroup.Name,
		Description:  inputGroup.Description,
		Category:     inputGroup.Category,
		GroupBalance: "0",
		GoalBalance:  inputGroup.GoalBalance,
		Emails:       inputGroup.Emails,
		Status:       "In-Progress",
	}
	groupResult := database.DB.Create(&groupData)
	if groupResult.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.GroupNotCreated})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "createGroup": groupData})
}

func FetchUserGroups(c *gin.Context) {
	var user_groups []models.Group
	var uid uint32
	var err error

	uid, err = auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	} else if err := database.DB.Where("user_id = ?", uid).Find(&user_groups).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": err.Error()})
		return
	}
	c.AbortWithStatusJSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": user_groups})
}

func FetchAUserGroup(c *gin.Context) {
	var user_group models.Group
	var group_id uint32
	var err error

	group_idStr := c.Param("id")
	group_id64, err := strconv.ParseUint(group_idStr, 10, 32)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.ServerError})
		return
	}
	user_id, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	}
	// Convert group_id64 to uint32
	group_id = uint32(group_id64)
	if err := database.DB.Where("id = ? AND user_id = ?", group_id, user_id).First(&user_group).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": utils.GroupNotFound})
		return
	}
	c.AbortWithStatusJSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": user_group})
}

func FetchGroupsByEmail(c *gin.Context) {
	var userGroupsPartOf []models.Group

	email := c.Query("email")
	if err := database.DB.Where("emails @> ARRAY[?]::varchar[]", email).Find(&userGroupsPartOf).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "error": utils.ServerError})
		return
	}
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": userGroupsPartOf})
}
