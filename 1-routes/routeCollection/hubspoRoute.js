const router = require("express").Router();

const {
  get_a_line_item_by_id,
  post_get_a_group_of_line_items_by_id,
} = require("../../3-controllers/hubspotLineItemController");

router.get("/api/get_a_line_item_by_id/:id", get_a_line_item_by_id);
router.post(
  "/api/post_get_a_group_of_line_items_by_id",
  post_get_a_group_of_line_items_by_id
);

module.exports = router;
