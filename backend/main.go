package main

import (
	"fmt"
	"log"
	"os"
	"time"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

	var DB *gorm.DB
	var SecretKey []byte

	type User struct{
		gorm.Model
		Name string `json:"name"`
		Email string `json:"email" gorm:"unique"`
		Password string `json:"password"`
		Role string `json:"role"`
		Course string `json:"course"`
	}

	func initDb() {
		connect := os.Getenv("DB_URL")
		var err error

		DB, err = gorm.Open(postgres.Open(connect), &gorm.Config{})

		if err != nil{
			panic("failed to connect to db")
		}

		fmt.Println("connected to db!")
		DB.AutoMigrate(&User{})
	}

	//auth
	func Signup(c *fiber.Ctx) error {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
		}

		password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

		user := User{
			Name: data["name"],
			Email: data["email"],
			Password: string(password),
			Role: data["role"],
			Course: data["course"],
		}

		if err := DB.Create(&user).Error; err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "email already exists"})
		}

		return c.JSON(user)
	}

	func Login(c *fiber.Ctx) error {
		var data map[string]string
		if err := c.BodyParser(&data); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
		}

		var user User

		DB.Where("email = ?", data["email"]).First(&user)
		if user.ID == 0 {
			return c.Status(404).JSON(fiber.Map{"error": "User not found"})
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"])); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Incorrect password"})
		}

		if user.Role == "student" {
			inputCourse := data["course"]
			if inputCourse == "" {
				return c.Status(400).JSON(fiber.Map{"error": "Please enter your course"})
			}

			cleanInput := strings.ToLower(strings.ReplaceAll(inputCourse, " ", ""))
			cleanDB := strings.ToLower(strings.ReplaceAll(user.Course, " ", ""))

			if cleanInput != cleanDB {
				return c.Status(400).JSON(fiber.Map{"error": "You are not enrolled in this course"})
			}
		}

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sub": user.ID,
			"role": user.Role,
			"exp": time.Now().Add(time.Hour * 24).Unix(),
		})

		token, err := claims.SignedString(SecretKey)
		if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Could not login"})
       }

	   return c.JSON(fiber.Map{
		"message": "sucess",
		"token": token,
		"user": fiber.Map{
			"id": user.ID,
			"name": user.Name,
			"role": user.Role,
			"email": user.Email,
			"course": user.Course,
		},
	   })
	}

	func GetUsers(c *fiber.Ctx) error {
		var users []User

		DB.Omit("password").Find(&users)
		return c.JSON(users)
	}

	func DeleteUser(c *fiber.Ctx) error {
    id := c.Params("id")
    
    result := DB.Unscoped().Delete(&User{}, id)
    
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Could not delete student"})
    }
    
    return c.JSON(fiber.Map{"message": "Student deleted successfully"})
}

	func CreateStudent(c *fiber.Ctx) error {
		var data map[string]string
    if err := c.BodyParser(&data); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
    }

		passwordInput := data["password"]
		if passwordInput == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Password is required"})
		}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(passwordInput), 14)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "Could not hash password"})
		}		
		user := User{
        Name:     data["name"],
        Email:    data["email"],
        Password: string(hashedPassword), 
        Role:     "student",           
        Course:   data["course"],
    }
	if err := DB.Create(&user).Error; err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Could not create student. Email might be taken."})
    }

		return c.Status(200).JSON(user)
	}

	func GetStudents(c *fiber.Ctx) error {
		var students []User
		DB.Where("role = ?", "student").Omit("password").Find(&students)
		return c.JSON(students)
	}


	func main(){
		err := godotenv.Load()
		if err != nil {
			log.Fatal("error loading .env file")
		}

		SecretKey = []byte(os.Getenv("SECRET_KEY"))

		if len(SecretKey) == 0 {
        log.Fatal("SECRET_KEY is not set in .env file")
    }

		app := fiber.New()

		frontendUrl := os.Getenv("FRONTEND_URL")
		if frontendUrl == ""{
			frontendUrl = "http://localhost:5173"
		}

		app.Use(cors.New(cors.Config{
			AllowOrigins: frontendUrl,
			AllowHeaders: "Origin, Content-Type, Accept",
		}))

		initDb()

		app.Get("/", func(c *fiber.Ctx) error {
			return c.SendString("backend is running!")
		})

		 app.Post("/api/students",CreateStudent)
		 app.Get("/api/students",GetStudents)
		 app.Delete("/api/students/:id", DeleteUser)

		app.Post("/api/signup", Signup)
		app.Post("/api/login", Login)
		app.Get("/api/users", GetUsers)     

		app.Listen(":3000")

	}