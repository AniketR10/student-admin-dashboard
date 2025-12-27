package main

import(
	"fmt"
	"github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

var DB *gorm.DB

type Student struct{
	gorm.Model
	Name string `json:"name"`
	Email string `json:"email"`
	Course string `json:"course"`
}

func initDb() {
	connect := "postgresql://neondb_owner:npg_9RgUIw2pndHx@ep-wispy-hill-ad49osm5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
	var err error

	DB, err := gorm.Open(postgres.Open(connect), &gorm.Config{})

	if err != nil{
		panic("failed to connect to db")
	}

	fmt.Println("connected to db!")
	DB.AutoMigrate(&Student{})
}

func main(){
	app := fiber.New()
	app.Use(cors.New())

	initDb()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("backend is running!")
	})

	app.Listen(":3000")
	
}