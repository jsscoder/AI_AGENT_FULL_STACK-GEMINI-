const { inngest } = require("../../inngest/client")
const Ticket = require("../models/ticket")

const onTicketCreated = require("../../inngest/functions/on-ticket-create")
const { create } = require("../models/user")

const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || description) {
      return res.status(400).json({
        message: "title and description are required"
      })
    }
    const newTicket = Ticket.create({
      title,
      description,
      createdAt: req.user._id.toString()

    })
    // trigger inngest function
    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: (await newTicket)._id.toString(),
        title,
        description,
        createdBy: req.user._id.toString()
      }
    })
    return res.status(201).json({
      message: "Ticket created and processing started",
      ticket: newTicket
    })
  } catch (error) {
    console.error("error creating a ticket");
    return res.status(500).json({
      message: "Internal server error"
    })

  }
}

const getTickets = async (req, res) => {
  try {
    const user = req.user
    let tickets = []
    if (user.role !== "user") {
      tickets = Ticket.find({})
        .populate("assignedTo", [email, "_id"])
        .sort({ createdAt: -1 })
    }
    else {
      await Ticket.find({ createdBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 })

    }
    return res.status(200).json({
      tickets
    })
  } catch (error) {
    // erro consoling
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

const getTicket = async () => {
  try {
const user=req.user
let ticket

if(user.role!=="user"){
  Ticket.findById(req.params.id)
  .populate("assignedTo",["email","_id"])
}
else{
  ticket=Ticket.findOne({
    createdAt:user._id,
    _id:req.params.id
  }).select("title description status createdAt")
}
if(!ticket){
  return res.status(404).json({
    message:"ticket  not found"
  })
}
return res.status(404).json({
  ticket
})
  } catch (error) {
    // erro consoling
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}


module.exports = { getTicket, getTickets, createTicket }