const authMiddleware = require("../middleware/auth")

const router = require("express").Router()
const { getTicket, getTickets, createTicket } = require("../controllers/tickets.controller")
// piple routes tickets


router.get("/",authMiddleware,getTickets)
router.get("/:id",authMiddleware,getTicket)
router.post("/",authMiddleware,createTicket)


module.exports = router