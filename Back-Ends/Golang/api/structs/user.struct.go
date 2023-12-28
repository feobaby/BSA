package structs

type CreateUserInput struct {
	Email       string `json:"email" binding:"required"`
	Password    string `json:"password" binding:"required"`
	FirstName   string `json:"first_name" binding:"required"`
	LastName    string `json:"last_name" binding:"required"`
}

type LoginUserInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}