const { Carmeet } = require("../models/carmeet")
const express = require("express")
const Joi = require("joi")


const router = express.Router()

router.get("/", async(req, res) => {
  try {
    const carmeets = await Carmeet.find({ isPast: false })
    .sort({ date: -1 })
    res.send(carmeets)
  } catch(error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
  
})

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string(),
    uid: Joi.string(),
    isPast: Joi.boolean(),
    price: Joi.number(),
    desc: Joi.string().max(4000),
    date: Joi.date(),
    country: Joi.string(),
    region: Joi.string()
  })

  const { error } = schema.validate(req.body)

  if(error) return res.status(400).send(error.details[0].message)

  const { name, author, isPast, uid, price, desc, date, country, region } = req.body

  let carmeet = new Carmeet({
    name, author, uid, isPast, price, desc, date, country, region
  })

  try {
    carmeet = await carmeet.save()
    res.send(carmeet)
  }catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
  }
});

router.put("/:id", async(req, res) => {
  
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string(),
    uid: Joi.string(),
    isPast: Joi.boolean(),
    price: Joi.number(),
    desc: Joi.string().max(4000),
    date: Joi.date(),
    country: Joi.string(),
    region: Joi.string()
  })

  const { error } = schema.validate(req.body)
  
  if(error) return res.status(400).send(error.details[0].message)

  const carmeet = Carmeet.findById(req.params.id)

  if(!carmeet) return res.status(404).send("Carmeet not found...")

  const { name, author, isPast, uid, price, desc, date, country, region } = req.body
  
  try{
    const updatedCarmeet = await Carmeet.findByIdAndUpdate(
      req.params.id, 
      {
        name,
        author,
        uid,
        isPast,
        price,
        desc,
        date,
        country,
        region
      },
      { new: true }
    )
  
    res.send(updated)

  }catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.delete("/:id", async(req, res) => {
  try{
    const deletedCarmeet = await Carmeet.findByIdAndDelete(req.params.id)

    res.send(deletedCarmeet)
  } catch(error){
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.delete("/", async(req, res) => {
  const deletedCarmeet = await Carmeet.deleteMany({ isPast: true })

  res.send(deletedCarmeet)
})



module.exports = router