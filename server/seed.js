var mongoose = require('mongoose');
 
// make a connection
mongoose.connect('mongodb://localhost:27017/tazweed');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    
    const userSchema = new mongoose.Schema({
        name: String,
        location: String,
        fromTime: String,
        toTime: String,
        appointement: Array
      });
      
    const User = mongoose.model('user',userSchema);
      
    // define Schema
    const appointmentSchema = new mongoose.Schema({
        fromTime: String,
        toTime: String,
        appointee_name: String,
        status: Boolean
    });
    // compile schema to model
    const Appointement = mongoose.model('appointment',appointmentSchema);

    // documents array
    const appointments = [{
        id: 12,
        fromTime: 1,
        toTime: 2,
        appointee_name: "A",
        status: false
      },
      {
        id:56,
        fromTime: 2,
        toTime: 3,
        appointee_name: "B",
        status: false
      },
      {
        id:98,
        fromTime: 3,
        toTime: 4,
        appointee_name: "C",
        status: false
      },
      { 
        id: 82,
        fromTime: 4,
        toTime: 5,
        appointee_name: "D",
        status: false
      },
      {
        id:79,
        fromTime: 5,
        toTime: 6,
        appointee_name: "E",
        status: false
      },
      {
        id:66,
        fromTime: 6,
        toTime: 7,
        appointee_name: "F",
        status: false
      }
    ];
 
    // save multiple documents to the collection referenced by Book Model
    Appointement.collection.insert(appointments, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple appointment inserted to Collection");
      }
    });

    const users = [{
        name: "Deepak",
        location: "Indore",
        fromTime: 8 ,
        toTime: 15,
        appointement:[]
        },
        {
            name: "Ram",
                location: "Indore",
                fromTime: 10,
                toTime: 15,
                appointement:[]
        },
        {
            name: "Mohan",
                location: "Indore",
                fromTime: 10 ,
                toTime: 13,
                appointement:[]
        },
        {
            name: "Shyam",
                location: "Indore",
                fromTime: 2 ,
                toTime: 10,
                appointement:[]
        },
        {
            name: "Sonu",
                location: "Indore",
                fromTime: 6 ,
                toTime: 16,
                appointement:[]
        },
        {
                name: "Titu",
                location: "Indore",
                fromTime: 8 ,
                toTime: 18,
                appointement:[]
        },
        {
            name: "Rohan",
                location: "Indore",
                fromTime: 8 ,
                toTime: 10,
                appointement:[]
        },
        {
            name: "Sohan",
                location: "Indore",
                fromTime: 8 ,
                toTime: 24,
                appointement:[]
        },
        {
            name: "Ekta",
                location: "Indore",
                fromTime: 8 ,
                toTime: 15,
                appointement:[]
        },
        {
            name: "Rahul",
                location: "Indore",
                fromTime: 12 ,
                toTime: 15,
                appointement:[]
        },
        {
            name: "Tapan",
                location: "Indore",
                fromTime: 11 ,
                toTime: 15,
                appointement:[]
        },
        {
            name: "Hari",
                location: "Indore",
                fromTime: 10 ,
                toTime: 15,
                appointement:[]
        }
    ]

    User.collection.insert(users, function (err, docs) {
        if (err){ 
            return console.error(err);
        } else {
          console.log("Multiple users inserted to Collection");
        }
    });
    
});
 