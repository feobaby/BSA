package models

import (
	"time"

	pq "github.com/lib/pq"
)

type Group struct {
	ID           uint32         `gorm:"primary_key;auto_increment" json:"id"`
	UserId       uint32         `sql:"type:int REFERENCES users(id)" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Name         string         `gorm:"size:100;not null;" json:"name"`
	Description  string         `gorm:"size:100;not null;" json:"description"`
	Category     string         `gorm:"size:100;not null;" json:"category"`
	GroupBalance string         `gorm:"size:100;not null;default:0" json:"groupBalance"`
	GoalBalance  string         `gorm:"size:100;not null;default:0" json:"goalBalance"`
	Emails       pq.StringArray `gorm:"type:varchar(255)[]"`
	Status       string         `gorm:"size:100;not null;" json:"status"`
	CreatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"createdAt"`
	UpdatedAt    time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updatedAt"`
}
