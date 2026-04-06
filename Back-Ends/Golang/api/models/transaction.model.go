package models

import (
	"time"
)

type Transaction struct {
	ID          uint32    `gorm:"primary_key;auto_increment" json:"id"`
	UserId      uint32    `sql:"type:int REFERENCES users(id)" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	AccountId   uint32    `sql:"type:int REFERENCES accounts(id)" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Amount      string    `gorm:"size:100;not null;default:0" json:"amount"`
	ReferenceNo string    `gorm:"size:100;not null;default:0" json:"referenceNo"`
	Category    string    `gorm:"size:100;not null;default:0" json:"category"`
	CreatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt   time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updatedAt"`
}
