const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide database password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://shreyaa:${password}@cluster0.watzvqj.mongodb.net/phonebook?appName=Cluster0`



mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

if (!mongoose.connection) {
  console.log('Error connecting to database')
  process.exit(1)
}

const schema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', schema)

if (process.argv.length <5){
  console.log('phonebook:')
  Person.find({}).then(result => {
    for (let person of result) {
      console.log(`${person.name} ${person.number}`)
    }
    mongoose.connection.close()
    process.exit(0)
  })
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(() => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
  process.exit(0)
})

