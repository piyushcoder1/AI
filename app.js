const express = require('express')
const axios = require('axios')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
});

app.post('/users', (req, res) => {
  const username = req.body.username
  axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
      const user = response.data
      res.render('users', { user })
    })
    .catch(error => {
      console.log(error)
      res.render('error')
    })
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})