const router = require("express").Router();

const {
  get_tickets,
  get_ticket_form,
  get_hubspot_tickets,
  post_ticket,
  post_ticket_form,
  update_ticket_types,
} = require("../../3-controllers/ticketController");

router.get("/", get_tickets);
router.get("/form", get_ticket_form);
router.get("/hubspot", get_hubspot_tickets);
router.post("/", post_ticket);
router.post("/form", post_ticket_form);
router.post("/update_ticket_types", update_ticket_types);

module.exports = router;
