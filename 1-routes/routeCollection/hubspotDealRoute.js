const router = require("express").Router();

const { get_deal } = require("../../3-controllers/hubspotDealController");

router.get("/:companyId", get_deal);

module.exports = router;
