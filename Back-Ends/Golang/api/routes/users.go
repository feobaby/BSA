package routes

import (
	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.RouterGroup) {
	r.POST("/auth/signup", controllers.CreateUser)
	r.POST("/auth/signin", controllers.LoginUser)
	r.GET("/auth/profile", controllers.FetchUserProfile)
}
