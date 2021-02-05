const carmeets = require("./routes/carmeets")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/carmeets", carmeets)

app.get("/", (req, res) => {
  res.send("Welcome")
})

const connection_string = process.env.CONNECTION_STRING
const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Server on port ${port}`)
})

mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connection successful")
}).catch((error) => console.log("MongoDB connection failed: ", error.message))