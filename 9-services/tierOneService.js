const { httpGet } = require("./httpService");
const TierOne = require("../10-entity/TierOne");
const { COMPANY_API_URI } = require("../5-utils/hubspotAPI");

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
