require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");


const app = express();

const ac = require("./controllers/authController");
const pc = require("./controllers/postsController")


const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7}}));


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("db is connected!");
});

const { user, registerUser, loginUser, logoutUser } = ac;
const {allPosts,addPost,editPost,deletePost,postById} = pc;
// Auth Endpoints
app.get("/auth/user", user); 
app.post("/auth/register", registerUser); 
app.post("/auth/login", loginUser); 
app.post("/auth/logout", logoutUser); 

// Posts Endpoints
app.get("/api/posts", allPosts);
app.get(`/api/posts?post_id=${post_id}`, postById)
app.post("/api/posts", addPost); 
app.put("/api/posts/:post_id", editPost);
app.delete("/api/posts/:post_id", deletePost);

app.listen(SERVER_PORT, () => {
  console.log(`LOFI RADIO STATION #: ${SERVER_PORT}`);
});
