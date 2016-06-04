Tasks = new Mongo.Collection('tasks');

parser = function(sms){
  var list = JSON.parse(JSON.stringify(sms));
  // json -> string 변환 후 배열화.

  alert(list[0].place);
  if(Tasks.find({}).count()!=0)
    Tasks.remove();

  for(var i=0;i<list.length;i++){
    Tasks.insert({
      bank : list[i].bank,
      month : list[i].month,
      day : list[i].day,
      time : list[i].time,
      place : list[i].place,
      money : list[i].money
    });
  }
} // android -> mongo

if (Meteor.isClient) {

  Template.hello.helpers({
    list : function(){
      return Tasks.find();
    }
  });

  Template.hello.events({
    'click button.a': function () {
      // increment the counter when button is clicked
      window.smsParser.setMessage("Android");
    }
  });
}