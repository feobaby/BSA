package structs

type CreateAccountInput struct {
	Balance string `json:"balance" binding:"required"`
}

type DepositAccountInput struct {
	Amount float64 `json:"amount" binding:"required"`
}
