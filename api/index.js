const mongoose = require('mongoose')
const app = require('./src/index')

const uri = 'mongodb+srv://basto:PruebaTecnicaBastó@basto.8hsga.mongodb.net/basto?retryWrites=true&w=majority'

// Conection to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(3001, () => console.log('Listening on port 3001'))
  })
  .catch(err => console.log(`Database connection error, ${err}`))
