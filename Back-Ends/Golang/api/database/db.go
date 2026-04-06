package database

import (
	"fmt"
	"log"
	"os"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() error {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		return fmt.Errorf("failed to load .env file: %w", err)
	}

	// Get database connection values from environment variables
	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
	)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return fmt.Errorf("failed to connect to the database: %w", err)
	}
	log.Println("Connected to the database!")

	// Auto migrate models
	if err := DB.AutoMigrate(&models.User{}, &models.Account{}, &models.Transaction{}, &models.Group{}); err != nil {
		return fmt.Errorf("failed to auto migrate models: %w", err)
	}
	log.Println("Auto migration completed!")

	return nil
}
