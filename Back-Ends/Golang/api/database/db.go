package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)
   
   var DB *gorm.DB
   
   func ConnectToDB() {
	var err error;
	dsn := "user=postgres password=postgres dbname=bsa host=localhost port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	fmt.Println(err)
    if err != nil {
		fmt.Println("Cannot connect to the database", DB)
		log.Fatal("This is the error:", err)
	} else {
		fmt.Println("You are connected to the database", DB)
	} 
}