package api

import (
	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/gin-gonic/gin"
)

func Route(r *gin.RouterGroup) {

	r.POST("/users", controllers.CreateUser)

	return
}