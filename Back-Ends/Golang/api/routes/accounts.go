package routes

import (
	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/gin-gonic/gin"
)

func AccountRoutes(r *gin.RouterGroup) {
	r.PUT("/account/deposit-wallet", controllers.DepositMoneytoAccount)
}
