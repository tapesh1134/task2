const {Event} = require('../models');

const getallevent = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:'error'});
  }
};

const geteventid = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'no event' });
    }

    res.json(event);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error' });
  }
};

const createevent =async(req,res) =>{
  try {
    const {title,description,dateTime,location,totalSeats}=  req.body;

    if (!title || !description || !dateTime || !location || !totalSeats) {
      return res.status(400).json({ message: 'fill all fields' });
    }

    const newEvent = await Event.create({
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats: totalSeats,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'errort' });
  }
};

const updateevent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'no event' });
    }
    const { title, description, dateTime, location, totalSeats } = req.body;
    if (title !== undefined) event.title = title;

    if (description !== undefined) event.description = description;

    if (dateTime !== undefined) event.dateTime = dateTime;

    if (location !== undefined) event.location = location;
    if (totalSeats !== undefined) {
      if (totalSeats < event.totalSeats - event.availableSeats) {
        return res.status(400).json({ message: 'error' });
      }
      const seatsBooked = event.totalSeats - event.availableSeats;
      event.totalSeats = totalSeats;
      event.availableSeats = totalSeats - seatsBooked;
    }

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'internal error' });
  }
};

const deleteevent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'no event' });
    }

    await event.destroy();
    res.json({ message: 'event deleted' });
  } catch (error) {
    res.status(500).json({ message:'error'});
  }
};

module.exports = {
  getallevent,
  geteventid,
  createevent,
  updateevent,
  deleteevent,
};
