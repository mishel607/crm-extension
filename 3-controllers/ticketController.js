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
