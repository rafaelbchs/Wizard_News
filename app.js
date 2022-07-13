const express = require("express");
const app = express();
const data = require("./postBank")
const morgan = require('morgan')
const {list, find} = data


app.use(morgan('dev'));
app.use(express.static('public'))

app.get("/", (req, res) => {
  const posts = list()
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`
  
  res.send(html)
  posts.map((post)=>{console.log(post.name)})
}
);
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = find(id);
  if (!post.id) {
    throw new Error('Not Found')
  }
   
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${`
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <span class="news-info">
            ${post.content}
          </span>
        </div>
      `}
    </div>
  </body>
</html>`
  res.send(html);
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