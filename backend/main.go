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
		Email string `json:"email" gorm:"unique"`
		Course string `json:"course"`
	}

	func initDb() {
		connect := "postgresql://neondb_owner:npg_9RgUIw2pndHx@ep-wispy-hill-ad49osm5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
		var err error

		DB, err = gorm.Open(postgres.Open(connect), &gorm.Config{})

		if err != nil{
			panic("failed to connect to db")
		}

		fmt.Println("connected to db!")
		DB.AutoMigrate(&Student{})
	}

	func CreateStudent(c *fiber.Ctx) error {
		student := new(Student)

		if err := c.BodyParser(student); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
		}

		result := DB.Create(student)
		if result.Error != nil {
			return c.Status(400).JSON(fiber.Map{"error": "could not create student"})
		}

		return c.Status(200).JSON(student)
	}

	func GetStudents(c *fiber.Ctx) error {
		var students []Student
		DB.Find(&students)
		return c.JSON(students)
	}

	func DeleteStudent(c *fiber.Ctx) error {
		id := c.Params(("id"))
		student := new(Student)

		if err := DB.First(&student, id).Error; err != nil {
			return c.Status(404).JSON(fiber.Map{"error": "student not found"})
		}

		DB.Delete(&student)
		return c.JSON(fiber.Map{"message": "student deleted successfully"})
	}


	func main(){
		app := fiber.New()
		app.Use(cors.New(cors.Config{
			AllowOrigins: "http://localhost:5173", //react app
			AllowHeaders: "Origin, Content-Type, Accept",
		}))

		initDb()

		app.Get("/", func(c *fiber.Ctx) error {
			return c.SendString("backend is running!")
		})

		app.Post("/api/students",CreateStudent)
		app.Get("/api/students",GetStudents)
		app.Delete("/api/students/:id", DeleteStudent)

		app.Listen(":3000")

	}