var request = require("request-promise");
const { json } = require("express");
const { hubs } = require("../5-utils/constants");

exports.get_a_line_item_by_id = async (req, res, next) => {
  try {
    const lineId = req.params.id;
    const { client } = req.query;

    console.log({ lineId });

    const { properties } = await request({
      method: "GET",
      url: `https://api.hubapi.com/crm-objects/v1/objects/line_items/${lineId}`,
      qs: {
        hapikey: hubs[client].hapikey,
        properties: "hs_product_id",
        properties: "name",
        properties: "supplier_drop_down",
        properties: "price",
      },
      json: true,
    });

    let lineItem = {
      lineId,
      name: properties.name ? properties.name.value : "",
      hs_product_id: properties.hs_product_id
        ? properties.hs_product_id.value
        : 0,
      supplier_drop_down: properties.supplier_drop_down
        ? properties.supplier_drop_down.value
        : "",
      price: properties.price ? properties.price.value : 0,
    };
    return res.json(lineItem);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function get_a_group_of_line_items_by_id(lineId) {
  try {
    const { properties } = await request({
      method: "POST",
      url: `https://api.hubapi.com/crm-objects/v1/objects/line_items/batch-read`,
      qs: {
        hapikey: "3dea956b-54b7-4f8c-af5b-c5c8d5af3add",
        properties: "hs_product_id",
        properties: "name",
        properties: "supplier_drop_down",
        properties: "price",
        properties: "quantity",
      },
      json: true,
    });

    let lineItems = {
      lineId,
      name: properties.name ? properties.name.value : "",
      hs_product_id: properties.hs_product_id
        ? properties.hs_product_id.value
        : 0,
      supplier_drop_down: properties.supplier_drop_down
        ? properties.supplier_drop_down.value
        : "",
      price: properties.price ? properties.price.value : 0,
      quantity: properties.quantity ? properties.quantity.value : 0,
    };
    return deal;
  } catch (error) {}
}
