const router = require("express").Router();

const {
  post_tierOne,
  get_tierOne,
  get,
} = require("../../3-controllers/tierOneController");

const { get_a_line_item_by_id } = require("../../9-services/tierOneService");

router.get("/", get_tierOne);
router.post("/", post_tierOne);
router.get("/get_a_line_item_by_id/:id", get_a_line_item_by_id);

module.exports = router;
