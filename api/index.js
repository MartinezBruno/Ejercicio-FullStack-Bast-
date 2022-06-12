const mongoose = require('mongoose')

const uri = 'mongodb+srv://basto:PruebaTecnicaBastó@basto.8hsga.mongodb.net/basto?retryWrites=true&w=majority'

// Conection to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log(`Database connection error, ${err}`))
