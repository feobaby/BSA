package structs

type CreateTransactionInput struct {
	Amount      string `json:"amount" binding:"required"`
	ReferenceNo string `json:"referenceNo" binding:"required"`
	Category    string `json:"category" binding:"required"`
}
