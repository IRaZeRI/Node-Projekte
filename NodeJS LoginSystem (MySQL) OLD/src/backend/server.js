const express = require('express')
const app = express();
const port = 3000; //comment

app.use(express.static('../frontend/root'))


app.listen(port, () => {
    console.log(`Codeshit bingo listening at http://localhost:${port}`)
  })