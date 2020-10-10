const express = require('express')
const app = express()
const port = 5000

app.get('/login', (req, res) => {
  return res.send('you are visiting login page!');
});
const admin= (req, res) => {
  return res.send("admin dashboard"); // other way
};
app.get("/admin",admin);  //passing admin variable
const isAdmin = (req,res,next) => {
  console.log("isAdmin running");
  next();
}
app.get("/admin, isAdmin, admin");  //isAdmin is a middleware

app.get('/home', (req, res) => {
  return res.send('you are visiting home page!');
});

app.get('/signout', (req, res) => {
  return res.send('BYE!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});