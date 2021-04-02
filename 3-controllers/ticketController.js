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

exports.get_hubspot_tickets = async (req, res, next) => {
  try {
    const results = await Ticket.find();
    console.log("get_tickets");
    //return res.send(results);

    res.json({
      applicationId: 767676,
      baseUris: ["https://example.com/actions"],
      dataFetchUri: "https://example.com/demo-tickets",
      title: "DemoTickets",
      propertyDefinitions: [
        {
          name: "ticket_type",
          label: "Ticket type",
          dataType: "STRING",
        },
        {
          options: [
            {
              type: "SUCCESS",
              label: "In Progress",
              name: "inprogress",
            },
            {
              type: "DEFAULT",
              label: "Resolved",
              name: "resolved",
            },
          ],
          name: "status",
          label: "Status",
          dataType: "STATUS",
        },
        {
          name: "priority",
          label: "Priority",
          dataType: "STRING",
        },
        {
          name: "project",
          label: "Project",
          dataType: "STRING",
        },
      ],
      associatedHubSpotObjectTypes: ["COMPANY"],
      associatedHubSpotObjectTypeProperties: {
        COMPANY: ["domain"],
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
