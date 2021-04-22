const { httpGet, httpPost, httpPut, httpDelete } = require("./httpService");
const TierOne = require("../10-entity/TierOne");
const { COMPANY_API_URI } = require("../5-utils/hubspotAPI");
const { hubs } = require("../5-utils/constants");

const currentAPPURI = "http://localhost:8080/hubspot";

exports.get_a_line_item_by_id = async (req, res, next) => {
  try {
    let lineItemId = req.params.id;
    const uri = `${currentAPPURI}/api/get_a_line_item_by_id/${lineItemId}?client=${hubs.TierOne.client}`;
    console.log({ uri });
    const { data } = await httpGet(uri);

    //return res.render("lineItem", { lineItem: data });
    return res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.get_a_group_of_line_items_by_id = async (req, res, next) => {
  try {
    let lineItemId = req.params.id;
    const uri = `${currentAPPURI}/api/get_a_line_item_by_id/${lineItemId}?client=${hubs.TierOne.client}`;
    console.log({ uri });
    const { data } = await httpGet(uri);

    //return res.render("lineItem", { lineItem: data });
    return res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.get_company = async (companyId) => {
  const company = {};
  try {
    const { data } = await httpGet(`${COMPANY_API_URI}/${companyId}`, {
      params: {
        hapikey: TierOne.get_tierone_hapi_key(),
      },
    });
    if (data) {
      return data;
    }
    return company;
  } catch (error) {
    return company;
  }
};
