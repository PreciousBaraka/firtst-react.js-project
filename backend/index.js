import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from 'bcrypt'

const app = express();
app.use(cors());
app.use(express.json()); //  Allow JSON data from frontend

//  Connect to MySQL database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
  multipleStatements: true // Allow multiple SQL queries
});

//  Check MySQL connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// API to get all users (for testing)
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.sqlMessage });
    return res.json(data);
  });
});

//  API to register a new user
app.post('/users/register', async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  //  Check if all fields are provided
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //  Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10)

  //  Insert user into MySQL database
  const sql = "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";
  db.query(sql, [fullName, email, encryptedPassword], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "User already exists!" });
      }
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "The system is down", error: err.sqlMessage });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});
app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  //  Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //  Insert user into MySQL database
  const sql = "SELECT * FROM users where email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ message: "The system is down", error: err.sqlMessage });
    }
    if result.lenghth
    res.status(201).json({ message: "User logged in successfully!" });
  });
});
//  Home route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Backend is running!" });
});

//  Start server
app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
