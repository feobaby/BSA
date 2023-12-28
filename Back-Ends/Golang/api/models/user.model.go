package models

import (
	"time"
)

type User struct {
	ID               uint32      `gorm:"primary_key;auto_increment" json:"id"`
	Email            string    `gorm:"size:100;not null;unique" json:"email"`
	Password         string    `gorm:"size:100;not null;" json:"password"`
	FirstName        string    `gorm:"size:100;not null;" json:"firstName"`
	LastName         string    `gorm:"size:100;not null;" json:"lastName"`
	Role             string      `gorm:"default:false;not null;" json:"role"`
	CreatedAt        time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt        time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updatedAt"`
}