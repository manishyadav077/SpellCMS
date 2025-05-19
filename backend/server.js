const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const dbPath = path.join(__dirname, "db.json");


server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date().toISOString();
  }
  next();
});

server.use(cors());
server.use(middlewares);
// server.use(bodyParser.json());

function getDatabase() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function saveDatabase(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}


server.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  const db = getDatabase();
  const existingUser = db.users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
  };

  db.users.push(newUser);
  saveDatabase(db);

  res.status(201).json({
    token: "token_" + newUser.id,
    user: newUser,
  });
});


server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDatabase();
  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Enter correct credentials" });
  }

  res.json({
    token: "token_" + user.id,
    user,
  });
});


server.use(router);


const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
