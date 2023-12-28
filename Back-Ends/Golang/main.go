package main

import (
	"github.com/feobaby/bsa/api"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r = api.Route(r)

	r.Run(":3000")

}