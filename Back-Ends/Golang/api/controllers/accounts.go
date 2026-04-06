package controllers

import (
	"net/http"
	"strconv"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/auth"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/models"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func DepositMoneytoAccount(c *gin.Context) {
	var input structs.DepositAccountInput
	var account models.Account
	if err := c.ShouldBindJSON(&input); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get user id from bearer token
	uid, err := auth.ExtractTokenID(c.Request)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"status": http.StatusUnauthorized, "error": utils.Unauthorized})
		return
	}
	// Get user id from bearer token to find account
	if err := database.DB.First(&account, uid).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.AccountNotFound})
		return
	}
	// convert balance to float so as to add money, balance is represented as a str in the db
	balance, err := strconv.ParseFloat(account.Balance, 64)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// operation to add to balance
	balance += input.Amount

	// convert input amount to string for transaction record
	formatAmount := strconv.FormatFloat(input.Amount, 'f', 2, 64)

	// generate a unique string for referenceNo using uuid
	referenceNo := uuid.New().String()

	// create a transaction record for each balance update
	transactionData := models.Transaction{
		UserId:      uid,
		AccountId:   uid,
		Amount:      formatAmount,
		Category:    "wallet_deposit",
		ReferenceNo: referenceNo,
	}
	transaction := database.DB.Create(&transactionData)
	if transaction.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.TransactionNotRecorded})
		return
	}

	// before saving the balance, balance has to be connverted to a string first
	account.Balance = strconv.FormatFloat(balance, 'f', 2, 64)

	if err := database.DB.Save(&account).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": http.StatusInternalServerError, "error": utils.WalletBalanceNotUpdated})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": utils.SuccessFulWalletDeposit, "updatedBalance": account, "transaction": transactionData})
}
