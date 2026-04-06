package routes

import (
	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/gin-gonic/gin"
)

func TransactionRoutes(r *gin.RouterGroup) {
	r.GET("/transaction", controllers.FetchUserTransactions)
}
