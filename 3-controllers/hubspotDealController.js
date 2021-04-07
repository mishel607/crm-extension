var request = require("request-promise");
const Hubspot = require("hubspot");
const { json } = require("express");

exports.get_deal = async (req, res, next) => {
  const { companyId } = req.params;

  try {
    let companies = [];

    let company = {
      companyId,
      companyName: "",
      deals: [],
      totalDealAmount: 0,
    };

    let dealIds = await get_association_company_to_deal(companyId);
    console.log("dealIds", dealIds);

    if (dealIds) {
      for (dealId of dealIds) {
        let deal = await getDealInformation(dealId);
        let dealDetail = deal.dealname + " - " + deal.amount;
        company.deals.push({ ...deal, dealDetail: dealDetail });
      }
    }

    console.log("companies", company.deals);

    return res.render("hubDeal", { deals: company.deals });
  } catch (error) {
    next(error);
  }
};

async function get_association_company_to_deal(companyId) {
  try {
    const response = await request({
      method: "GET",
      url: `https://api.hubapi.com/crm-associations/v1/associations/${companyId}/HUBSPOT_DEFINED/6`,
      qs: {
        hapikey: "3dea956b-54b7-4f8c-af5b-c5c8d5af3add",
        limit: 100,
      },
      json: true,
    });
    let { results } = response;

    return results.length ? results : 0;
  } catch (error) {
    console.log(error);
  }
}

async function getDealInformation(dealId) {
  try {
    const { properties } = await request({
      method: "GET",
      url: `https://api.hubapi.com/deals/v1/deal/${dealId}`,
      qs: { hapikey: "3dea956b-54b7-4f8c-af5b-c5c8d5af3add" },
      json: true,
    });

    let deal = {
      dealId,
      amount: properties.amount ? properties.amount.value : 0,
      dealname: properties.dealname ? properties.dealname.value : "",
    };
    return deal;
  } catch (error) {}
}
