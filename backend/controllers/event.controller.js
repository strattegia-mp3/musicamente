const Event = require("../models/event.model");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, organizer, category } =
      req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer,
      category,
    });

    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar o evento", error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os eventos", error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar as informações do evento",
      error: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
      new: true,
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o evento", error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    await Event.findByIdAndRemove(eventId);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao excluir o evento", error: error.message });
  }
};
