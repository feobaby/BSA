package utils

import (
	"golang.org/x/crypto/bcrypt"
)

// Hash the password ...
func Hash(password string) (string, error) {
	bytes, error := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), error
}

// CheckHash compare password ...
func CheckHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

