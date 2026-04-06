package main

import (
	"log"
	"os"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	err := database.ConnectToDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	// Set Gin to release mode in production
	var env string
	if env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Configure the routing
	r := gin.Default()

	apiV1 := r.Group("/api/v1")
	{
		routes.InitRoutes(apiV1)
		routes.UserRoutes(apiV1)
		routes.AccountRoutes(apiV1)
		routes.TransactionRoutes(apiV1)
		routes.GroupRoutes(apiV1)
	}

	// Determine the port
	var port string
	if env == "production" {
		port = os.Getenv("PORT")
	} else {
		port = "3000" // Default port for other environments
	}

	// Start the server
	err = r.Run(":" + port)
	if err != nil {
		log.Fatalf("Cannot start server: %v", err)
	}
}
