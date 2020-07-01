const User = require('../Model/userSchema');
const Appointment = require('../Model/appointmentSchema');

exports.getSellers = async (req, res, next) => {
  try{
      const users = await User.find();
      if (users) {
        res.send({ users, success: true });
      } else {
        res.send({ auth: false, success: false });
      }
  }
  catch(err){
    console.log(err);
  }
}

exports.getAppointments = async (req, res, next) => {
  try{
      const appointments = await Appointment.find();
      if (appointments) {
        res.send({ appointments, success: true });
      } else {
        res.send({ auth: false, success: false });
      }
  }
  catch(err){
    console.log(err);
  }
}
