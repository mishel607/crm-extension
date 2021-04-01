const router = require("express").Router();

const {
  get_tickets,
  post_ticket,
} = require("../../3-controllers/ticketController");

router.get("/", get_tickets);
router.post("/", post_ticket);

module.exports = router;
