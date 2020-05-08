//jshint esversion:6

exports.getDate  = function (){
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };//modifica como é mostrada a data

  return todayHumanFormated = today.toLocaleDateString("pt-BR", options);
}
exports.getDay = function (){
  const today = new Date();
  const options = { weekday: 'long'};//modifica como é mostrada a data

  return todayHumanFormated = today.toLocaleDateString("pt-BR", options);
}
