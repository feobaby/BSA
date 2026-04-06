package tests

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/feobaby/BSA/Back-Ends/Golang/api/database"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/routes"
	"github.com/feobaby/BSA/Back-Ends/Golang/api/structs"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestMain(m *testing.M) {
	err := database.ConnectToDB()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	exitCode := m.Run()
	os.Exit(exitCode)
}
func TestCreateUser(t *testing.T) {
	// Initialize a new Gin engine
	router := gin.Default()

	// Initialize a new RouterGroup
	r := router.Group("/api/v1")

	// Call InitRoutes with the RouterGroup
	routes.UserRoutes(r)

	// Prepare valid input data
	validInput := structs.CreateUserInput{
		Email:     "test@example.com",
		Password:  "password123",
		FirstName: "John",
		LastName:  "Doe",
	}
	validInputJSON, _ := json.Marshal(validInput)

	// Create a request with valid input JSON
	req := httptest.NewRequest("POST", "/api/v1/auth/signup", bytes.NewBuffer(validInputJSON)) // Modified URL path
	req.Header.Set("Content-Type", "application/json")

	// Create a ResponseRecorder to record the response
	resp := httptest.NewRecorder()

	// Serve the request to the router
	router.ServeHTTP(resp, req)

	// Check if the status code is as expected
	assert.Equal(t, http.StatusCreated, resp.Code)

	// Decode the response body to check if it contains expected data
	var responseData map[string]interface{}
	json.Unmarshal(resp.Body.Bytes(), &responseData)

	// Check if the response contains the expected data
	assert.NotNil(t, responseData["status"])
	assert.NotNil(t, responseData["token"])
	assert.NotNil(t, responseData["data"])

	userData := responseData["data"].(map[string]interface{})
	assert.Equal(t, "test@example.com", userData["Email"])
	assert.Equal(t, "John", userData["FirstName"])
	assert.Equal(t, "Doe", userData["LastName"])
}
