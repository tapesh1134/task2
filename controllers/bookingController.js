const {Booking,Event} =require('../models');

exports.bookticket =async(req, res) =>{
  try {
    const event =await Event.findByPk(req.body.eventId);
    if (!event) {
        return res.status(404).json({message:'no event'});

    }
    if (event.availableSeats < 1) {

        return res.status(400).json({ message: 'no seat' });
    }

    const bookexist =await Booking.findOne({
      where: {userId:req.user.id,eventId:event.id},
    });
    if (bookexist) {

        return res.status(400).json({ message: 'booked already' });
    }

    const book =await Booking.create({userId:req.user.id,eventId:event.id});
    event.availableSeats -= 1;
    await event.save();

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'err', error });
  }
};

exports.getuserbooking = async (req, res) => {
  try {
    const books =await Booking.findAll({
      where:{userId: req.user.id},
      include:'Event'
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({message:'internal error'});
  }
};

exports.deletebooking = async (req, res) => {
  try {
    const book =await Booking.findOne({
      where:{id:req.params.id,userId:req.user.id },
      include: Event
    });
    if (!book){
        return res.status(404).json({message:'no booking'});

    }

    const event = book.Event;
    event.availableSeats += 1;
    await event.save();

    await book.destroy();
    res.json({ message: 'deleted booking' });
  } catch (error) {
    res.status(500).json({ message: 'error', error });
  }
};
