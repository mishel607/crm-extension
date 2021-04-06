const { httpGet } = require("./httpService");
const currentAPPURI = "http://localhost:8080/tickets";

exports.view_tickets = async (req, res, next) => {
  try {
    const uri = `${currentAPPURI}/api/tickets`;
    console.log("uri", uri);

    const { data } = await httpGet(uri);

    return res.render("tickets", { tickets: data });
    //return res.render("tickets");
  } catch (error) {
    next(error);
  }
};

exports.view_add_ticket = async (req, res, next) => {
  try {
    const ticket = {
      ticketName: "",
      description: "",
      ticketPipeline: "",
      ticketStatus: "New",
    };

    return res.render("add_ticket", { ticket });
  } catch (error) {
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
