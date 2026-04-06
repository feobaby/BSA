package structs

type CreateGroupInput struct {
	Name         string   `json:"name" binding:"required"`
	Description  string   `json:"description" binding:"required"`
	Category     string   `json:"category" binding:"required"`
	GroupBalance string   `json:"groupBalance"`
	GoalBalance  string   `json:"goalBalance" binding:"required"`
	Emails       []string `json:"emails" binding:"required"`
	Status       string   `json:"status"`
}
