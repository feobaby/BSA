package routes

import (
	"github.com/feobaby/bsa/api/controllers"
	"github.com/gin-gonic/gin"
)

func Route(router *gin.RouterGroup) {
	router.POST("/users", controllers.CreateUser)
}