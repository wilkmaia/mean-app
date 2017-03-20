// Import required modules
var Model = require('./models/models.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');


// Set express object
var app = express();


// Port the server listens to
var SERVER_PORT = 3000;


// Connects to MongoDB
var db = 'mongodb://localhost/mean-app';
mongoose.connect(db, function(err, response){
    if(err) {
        console.log('Failed to connect to ' + db);
        console.log(err);
        console.log(response);
    }
    else {
        console.log('Connected to ' + db);
    }
});


// ???
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Router for connections
var router = express.Router();

// ===== API/USERS =================================
// Lists all users
router.get('/api/users', function(request, response){
    Model.find({}, function(err, users){
        if (err) {
            response.status(404).send(err);
        }
        else {
            response.status(200).send(users);
        }
    });
});

// Add new user
router.post('/api/users', function(request, response){
    var model = new Model(request.body);
    model.save(function(err, user){
        if (err) {
            response.status(500).send(err);
        }
        else {
            response.status(201).send(user);
        }
    });
});

// Delete user
router.delete('/api/users/:id', function(request, response){
    var id = request.params.id;
    Model.remove({_id: id}, function(err, res){
        if (err) {
            response.status(500).send(err);
        }
        else {
            response.status(200).send({message: 'Failed', err: err});
        }
    });
});

// Update user
router.put('/api/users', function(request, response){
    id = request.body._id;
    Model.findById(id, function(err, user){
        if (err) {
            response.status(404).send(err);
        }
        else {
            user.update(request.body, function(err, msg){
                if (err) {
                    response.status(500).send(err);
                }
                else {
                    response.status(200).send({
                        status: 'success',
                        message: msg
                    })
                }
            });
        }
    });
});
// =================================================

app.use('/', router);


// ???
app.use(morgan('dev'));

// Starts express' static paging
app.use(express.static(__dirname + '/public'));

// Starts the server
app.listen(SERVER_PORT, function(){
    console.log('Listening on port ' + SERVER_PORT);
});

