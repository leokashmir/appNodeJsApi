const mongoose = require('mongoose');
const Apisky = mongoose.model('Apisky');

exports.listUser = async () => {
  const res = await Apisky.find({}, 'email senha -_id');
  return res;
};



exports.createUser = async data => {
  const apisky = new Apisky(data);
  return await apisky.save();
};

exports.validarUsuario = async data => {
  const res = await Apisky.findOne({email: data.email});
  return res;
};



