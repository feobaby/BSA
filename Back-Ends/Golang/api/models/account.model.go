package models

import (
	"time"
)

type Account struct {
	ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserId    uint32    `sql:"type:int REFERENCES users(id)" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Balance   string    `gorm:"size:100;not null;default:0" json:"balance"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updatedAt"`
}
