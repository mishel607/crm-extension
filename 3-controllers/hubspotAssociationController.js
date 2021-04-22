var request = require("request-promise");
const Hubspot = require("hubspot");

async function get_company_to_deal(companyId) {
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
async function get_deal_to_line_item(companyId) {
  try {
    const response = await request({
      method: "GET",
      url: `https://api.hubapi.com/crm-associations/v1/associations/${companyId}/HUBSPOT_DEFINED/19`,
      qs: {
        hapikey: "645e4669-478e-4172-bf2b-dce0e193b458",
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
