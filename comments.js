// Create web server and listen on port 3000
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read comments' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read comments' });
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), err => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to write comments' });
        } else {
          res.json(comments);
        }
      });
    }
  });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
/*
Try running the server and sending a `GET` request to the `/comments` endpoint. You should receive an empty array `[]` as the response.

Now, let's send a `POST` request to the `/comments` endpoint with a body containing a comment. The comment should be an object with a `content` key and a string value. For example, `{ "content": "This is a comment" }`. After sending the request, you should receive the same comment back as the response.

You can use the following `curl` command to send the `POST` request:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"content":"This is a comment"}' http://localhost:3000/comments
```

You can also use Postman or any other REST client to send the `POST` request.

After sending the `POST` request, you should see the following message in the terminal:

```
Server is listening on port 3000
```
*/

