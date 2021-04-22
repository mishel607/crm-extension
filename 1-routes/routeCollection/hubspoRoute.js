const router = require("express").Router();

const {
  get_a_line_item_by_id,
} = require("../../3-controllers/hubspotLineItemController");

router.get("/api/get_a_line_item_by_id/:id", get_a_line_item_by_id);

module.exports = router;
