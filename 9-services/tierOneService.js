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

//http://localhost:8080/tierone/post_get_a_group_of_line_items_by_id
// {
//   "ids": [
//     1259303592,
//     1308941986

//   ]
// }

exports.post_get_a_group_of_line_items_by_id = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const uri = `${currentAPPURI}/api/post_get_a_group_of_line_items_by_id?client=${hubs.TierOne.client}`;

    let { data } = await httpPost(uri, { ids });
    return res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//http://localhost:8080/tierone/get_company_carrier/5644499285?client=TierOne
exports.get_company_carrier = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    //const uri = `${currentAPPURI}/api/get_company_to_deal/${companyId}?client=${hubs.TierOne.client}`;

    // const uri = `${currentAPPURI}/api/parent_company_to_child_company/${companyId}?client=${hubs.TierOne.client}`;
    // const { data } = await httpGet(uri);

    const companies = await get_parent_company_to_child_company(companyId);
    const deals = await get_company_to_deal(companies);
    const lineItemIds = await get_deal_to_line_item(deals);
    console.log({ lineItemIds });
    const { lineItems } = await get_group_of_line_items_by_ids(lineItemIds);

    console.log("lineItems::", lineItems);

    // const arr = [
    //   { Phase: "Phase 1", Step: null, Task: undefined, Value: "5" },
    //   { Phase: "Phase 1", Step: "Step 1", Task: "Task 2", Value: "10" },
    //   { Phase: "Phase 1", Step: "Step 2", Task: "Task 1", Value: "15" },
    //   { Phase: "Phase 1", Step: "Step 2", Task: "Task 2", Value: "20" },
    //   { Phase: "Phase 2", Step: "Step 1", Task: "Task 1", Value: "25" },
    //   { Phase: "Phase 2", Step: "Step 1", Task: undefined, Value: "30" },
    //   { Phase: "Phase 2", Step: "Step 2", Task: "Task 1", Value: "35" },
    //   { Phase: "Phase 2", Step: null, Task: "Task 2", Value: "40" },
    // ];

    //let sumNrc = lineItems.map((p) => p);

    const groupBy = (key) =>
      lineItems.reduce((total, currentValue) => {
        const newTotal = total;
        if (total.length && total[total.length - 1][key] === currentValue[key])
          newTotal[total.length - 1] = {
            ...total[total.length - 1],
            ...currentValue,
            price:
              parseFloat(total[total.length - 1].price) +
              parseFloat(currentValue.price),
          };
        else newTotal[total.length] = currentValue;
        return newTotal;
      }, []);

    // groupBy("carrier");

    return res.json(groupBy("carrier"));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function get_parent_company_to_child_company(companyId) {
  try {
    const uri = `${currentAPPURI}/api/parent_company_to_child_company/${companyId}?client=${hubs.TierOne.client}`;
    const { data } = await httpGet(uri);
    data.push(companyId);

    return data;
  } catch (error) {
    next(error);
  }
}

async function get_company_to_deal(companies) {
  try {
    let counter = 1;
    let deals = [];
    for (let company of companies) {
      const uri = `${currentAPPURI}/api/get_company_to_deal/${company}?client=${hubs.TierOne.client}`;
      const { data } = await httpGet(uri);
      deals.push(...data);

      if (counter === 5) break;

      counter += 1;
    }
    return deals;
  } catch (error) {
    next(error);
  }
}

async function get_deal_to_line_item(deals) {
  try {
    let counter = 1;
    let lineItemIds = [];
    for (let deal of deals) {
      const uri = `${currentAPPURI}/api/get_deal_to_line_item/${deal}?client=${hubs.TierOne.client}`;
      const { data } = await httpGet(uri);
      lineItemIds.push(...data);
      if (counter === 1) break;

      counter += 1;
    }
    return lineItemIds;
  } catch (error) {
    next(error);
  }
}
async function get_group_of_line_items_by_ids(lineItemIds) {
  try {
    const ids = lineItemIds;

    const uri = `${currentAPPURI}/api/post_get_a_group_of_line_items_by_id?client=${hubs.TierOne.client}`;

    let { data } = await httpPost(uri, { ids });
    return data;
  } catch (error) {
    console.log(error);
    next(error);
  }
}

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
