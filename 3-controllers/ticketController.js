const Ticket = require("../4-models/Ticket");
const createError = require("http-errors");

exports.get_tickets = async (req, res, next) => {
  try {
    const results = await Ticket.find();
    console.log("get_tickets");
    return res.send(results);
  } catch (error) {
    next(error);
  }
};
exports.get_ticket_form = async (req, res, next) => {
  try {
    return res.status(200).render("ticket", { flashMessage: {} });
  } catch (error) {
    next(error);
  }
};

exports.post_ticket_form = async (req, res, next) => {
  try {
    const { description } = req.body;
    console.log(`post_ticket_form:::${description}`);

    return res.status(200).render("ticket", { flashMessage: {} });
  } catch (error) {
    next(error);
  }
};

exports.get_hubspot_tickets = async (req, res, next) => {
  try {
    const results = await Ticket.find();
    console.log("get_tickets");
    //return res.send(results);

    res.json({
      results: [
        {
          objectId: 245,
          title: "API-22: APIs working too fast",
          link: "http://example.com/1",
          created: "2016-09-15",
          priority: "HIGH",
          project: "API",
          reported_by: "msmith@hubspot.com",
          description:
            "Customer reported that the APIs are just running too fast. This is causing a problem in that they're so happy.",
          reporter_type: "Account Manager",
          status: "In Progress",
          ticket_type: "Bug",
          updated: "2016-09-28",
          actions: [
            {
              type: "IFRAME",
              width: 890,
              height: 748,
              uri: "https://example.com/edit-iframe-contents",
              label: "Edit",
              associatedObjectProperties: [],
            },
            {
              type: "IFRAME",
              width: 890,
              height: 748,
              uri: "https://example.com/reassign-iframe-contents",
              label: "Reassign",
              associatedObjectProperties: [],
            },
            {
              type: "ACTION_HOOK",
              httpMethod: "PUT",
              associatedObjectProperties: [],
              uri: "https://example.com/tickets/245/resolve",
              label: "Resolve",
            },
            {
              type: "CONFIRMATION_ACTION_HOOK",
              confirmationMessage:
                "Are you sure you want to delete this ticket?",
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              httpMethod: "DELETE",
              associatedObjectProperties: ["protected_account"],
              uri: "https://example.com/tickets/245",
              label: "Delete",
            },
          ],
        },
        {
          objectId: 988,
          title: "API-54: Question about bulk APIs",
          link: "http://example.com/2",
          created: "2016-08-04",
          priority: "HIGH",
          project: "API",
          reported_by: "ksmith@hubspot.com",
          description:
            "Customer is not able to find documentation about our bulk Contacts APIs.",
          reporter_type: "Support Rep",
          status: "Resolved",
          ticket_type: "Bug",
          updated: "2016-09-23",
          properties: [
            {
              label: "Resolved by",
              dataType: "EMAIL",
              value: "ijones@hubspot.com",
            },
            {
              label: "Resolution type",
              dataType: "STRING",
              value: "Referred to documentation",
            },
            {
              label: "Resolution impact",
              dataType: "CURRENCY",
              value: "94.34",
              currencyCode: "GBP",
            },
          ],
          actions: [
            {
              type: "IFRAME",
              width: 890,
              height: 748,
              uri: "https://example.com/edit-iframe-contents",
              label: "Edit",
            },
            {
              type: "CONFIRMATION_ACTION_HOOK",
              confirmationMessage:
                "Are you sure you want to delete this ticket?",
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              httpMethod: "DELETE",
              associatedObjectProperties: ["protected_account"],
              uri: "https://example.com/tickets/245",
              label: "Delete",
            },
          ],
        },
      ],
      settingsAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://example.com/settings-iframe-contents",
        label: "Settings",
      },
      primaryAction: {
        type: "IFRAME",
        width: 890,
        height: 748,
        uri: "https://example.com/create-iframe-contents",
        label: "Create Ticket",
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.post_ticket = async (req, res, next) => {
  const { name, description } = req.body;
  console.log("post_ticket");
  const ticket = new Ticket({
    description,
  });

  try {
    const result = await ticket.save();
    console.log("post_ticket");
    return res.send(result);
  } catch (error) {
    next(error);
  }
};
