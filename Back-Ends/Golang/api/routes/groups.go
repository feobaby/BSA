package routes

import (
	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/gin-gonic/gin"
)

func GroupRoutes(r *gin.RouterGroup) {
	r.POST("/group/create", controllers.CreateGroup)
	r.GET("/group/user", controllers.FetchUserGroups)
	r.GET("/group/:id", controllers.FetchAUserGroup)
	r.GET("/group", controllers.FetchGroupsByEmail)
}
