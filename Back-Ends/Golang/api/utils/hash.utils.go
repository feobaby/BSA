package utils

import (
	"golang.org/x/crypto/bcrypt"
)

// GeneratePasswordHash generates a bcrypt hash of the given password.
func GeneratePasswordHash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// ComparePasswordHash compares the given password with the bcrypt hash.
func ComparePasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
