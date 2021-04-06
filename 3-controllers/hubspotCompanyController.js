const Hubspot = require("hubspot");
const hubspot = new Hubspot({
  apiKey: "3dea956b-54b7-4f8c-af5b-c5c8d5af3add",
  checkLimit: false, // (Optional) Specify whether to check the API limit on each call. Default: true
});

exports.get_carrier = (req, res, next) => {};

exports.get_carrier = async (req, res, next) => {
  //res.send("update a single product.");
  try {
    let reqBody = req.body;
    let { name } = req.body;

    console.log("reqBody:::", reqBody);
    console.log("name:::", name);

    // let temp = await hubspot.companies.getById("4490302912");
    // console.log(temp);

    res.send(reqBody);
  } catch (error) {
    next(error);
  }
};
