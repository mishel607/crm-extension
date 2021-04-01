const router = require("express").Router();

const {
  post_tierOne,
  get_tierOne,
} = require("../../3-controllers/tierOneController");

router.get("/", get_tierOne);
router.post("/", post_tierOne);

module.exports = router;
