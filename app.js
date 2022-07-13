const express = require("express");
const app = express();
const data = require("./postBank")
const morgan = require('morgan')
const {list, find} = data

app.use(morgan('dev'));

app.get("/", (req, res) => {
  const posts = list()
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title> Wizard News </title>
  </head>
  <body>
  <ul>
    ${posts.map(post=>`<li>${post.name}</li><li>${post.title}</li>`).join(' ')}
  </ul>
  </body>
  `
  res.send(html)
  posts.map((post)=>{console.log(post.name)})
}
);

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
