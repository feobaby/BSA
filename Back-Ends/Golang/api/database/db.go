package database

import (

	// imports the postgres driver
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB ...
var DB *gorm.DB

func connectToPostgreSQL() (*gorm.DB, error) {
	dsn := "user=postgres password=postgres dbname=bsa host=localhost port=5432 sslmode=disable"
    DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }

    return DB, nil
}