
 const ussd_backend = require("./canisters/ussd_backend/ussd_backend.did")
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Sample data
let posts = [
  { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
  { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
];

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  res.json(post);
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);

  res.json({ message: 'Post deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
