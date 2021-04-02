const router = require("express").Router();

const {
  get_tickets,
  get_hubspot_tickets,
  post_ticket,
} = require("../../3-controllers/ticketController");

router.get("/", get_tickets);
router.get("/hubspot", get_hubspot_tickets);
router.post("/", post_ticket);

module.exports = router;
