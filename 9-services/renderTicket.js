const { httpGet, httpPost } = require("./httpService");
const currentAPPURI = "http://localhost:8080/tickets";
const {
  formActionTypes,
  pipeline,
  ticketTypes,
} = require("../5-utils/constants");

exports.view_tickets = async (req, res, next) => {
  try {
    let currentPage = parseInt(req.query.page) || 1;
    const uri = `${currentAPPURI}/api/get_finds?page=${currentPage}`;
    const { data } = await httpGet(uri);

    return res.render("tickets", { tickets: data });
  } catch (error) {
    next(error);
  }
};

exports.view_get_add_ticket = async (req, res, next) => {
  console.log("view_get_add_ticket", req.body);
  try {
    const ticket = formatReqBody({
      ticketName: "",
      pipeline, //check box
      checkedPipeline: "warrany,implementation",
      description: "",
      ticketStatus: "New", //radio button
      ticketTypes, //ddl
      ticketType: "SOLVE",
    });

    console.log(ticket);

    return res.render("add_ticket", { ticket });
  } catch (error) {
    next(error);
  }
};

function formatReqBody(body) {
  let formTitle = "Add ticket";
  let actionTypes = formActionTypes.add;
  let formAction = "/tickets/addTicket";
  let formActionMethod = "POST";

  return {
    ...body,
    formTitle,
    formActionTypes: actionTypes,
    formAction,
    formActionMethod,
  };
}

exports.view_post_add_ticket = async (req, res, next) => {
  try {
    const uri = `${currentAPPURI}/api/post_add`;

    const {
      ticketName,
      ticketStatus,
      description,
      checkedPipeline,
      ticketType,
    } = req.body;
    const newOption = {
      ticketName,
      pipeline,
      checkedPipeline: checkedPipeline.toString().trim(),
      ticketPipeline: checkedPipeline.toString().trim(),
      ticketStatus,
      ticketTypes,
      ticketType,
      description: description.trim(),
    };

    console.log(newOption);

    let { data } = await httpPost(uri, newOption);
    if (data) {
      return res.redirect("/tickets");
    } else {
      console.log("newOption", newOption);
      return res.render("add_ticket", { ticket: formatReqBody(newOption) });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.view_update_ticket = async (req, res, next) => {
  try {
    const uri = `${currentAPPURI}/api/tickets?id=${req.params.id}`;
    console.log("uri", uri);

    const { data } = await httpGet(uri);

    console.log("data", data);

    return res.render("update_ticket", { ticket: data });
    //return res.render("tickets");
  } catch (error) {
    next(error);
  }
};

exports.view_delete_ticket = async (req, res, next) => {
  try {
    const uri = `${currentAPPURI}/api/tickets?id=${req.params.id}`;
    console.log("uri", uri);

    const { data } = await httpGet(uri);

    console.log("data", data);

    return res.render("delete_ticket", { ticket: data });
  } catch (error) {
    next(error);
  }
};
