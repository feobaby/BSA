package main

import (
	"log"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/controllers"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/validation"
	"github.com/gin-gonic/gin"
)

func init(){
	database.ConnectToDB()
   }

   
func main() {
	r := gin.Default()
	r.POST("/users", validation.ValidateUserEmail, controllers.CreateUser)

	r.Run(":3000")

		
	var err = database.DB.AutoMigrate(&models.User{}) 
	if err != nil {
		log.Fatalf("cannot migrate table: %v", err)
	}
	log.Fatal(err)

}
