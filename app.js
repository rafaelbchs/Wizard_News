const express = require("express");
const app = express();
const data = require("./postBank")
const morgan = require('morgan')
const {list, find} = data
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");



app.use(morgan('dev'));
app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = list()
  
  res.send(postList(posts))
  posts.map((post)=>{console.log(post.name)})
}
);
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  const post = find(id);
  if (!post.id) {
    throw new Error('Not Found')
  }
  
  res.send(postDetails(post));
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).send('Post Not Found')
})
// function errorHandler (err, req, res, next) {
//   res.status(404)
//   res.render('Post Not Found', { error: err })
// }