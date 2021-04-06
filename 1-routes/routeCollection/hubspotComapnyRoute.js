const router = require("express").Router();

const { get_carrier } = require("../../3-controllers/hubspotCompanyController");

router.get("/", get_carrier);

module.exports = router;
