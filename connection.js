
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/HippoFeedo';



var add= function(uname,uemail,uemployeeid,upassword,uposition,ujoining_date,uactive) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            //Create some users
            var data = {name:uname,email:uemail,employeeid:uemployeeid,password:upassword,position:uposition,joining_date:ujoining_date,active:uactive };


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some users
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "employees" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}

var check= function(cred,callback)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            var collection = db.collection('employees');

            collection.findOne({ email: cred.email, password: cred.password }, function(err, doc){
                if(err) throw err;

                if(doc) {
                    console.log("Found: " + cred.email + ", pass=" + cred.password);
                    callback(1);

                } else {

                    checkadmin(cred,function(ob) {
                    if(ob==2)
                    callback(2);
                        else
                        callback(0);
                    });

                    //console.log("Not found: " + cred.email);
                    //callback(0);
                }

                db.close();
            });

        }
    });
}


var checkadmin= function(cred,callback)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            var collection = db.collection('admin');

            collection.findOne({ email: cred.email, password: cred.password }, function(err, doc){
                if(err) throw err;

                if(doc) {
                    console.log("Found admin: " + cred.email + ", pass admin=" + cred.password);
                    callback(2);

                } else {
                            callback(0);
                }

                db.close();
            });

        }
    });
}


var checkDuplicate= function(email,employeeid,callback)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            var collection = db.collection('employees');

            collection.findOne({
                $or: [
                    {email: email}, {employeeid: employeeid}
                ]}, function(err, doc){

                if(err)
                    throw err;

                if(doc) {
                    console.log("Email: " + email +" and/or EmployeeId: "+ employeeid + " already exists");
                    callback(1);

                } else {
                    console.log("Not found: " + email);
                    callback(0);
                }

                db.close();
            });

        }
    });
}


var addcomplaint= function(email,title,description,priority,now)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('complaints');

            //Create some complaint
            var data = {email:email,title:title,description:description,priority:priority,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some complaint
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "complaints" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addsuggestion= function(email,title,description,now)
{

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('suggestions');

            //Create some suggestion
            var data = {email:email,title:title,description:description,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some complaint
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "suggestions" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addidea= function(email,title,description,product,now)
{

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('productideas');

            //Create some productideas
            var data = {email:email,title:title,description:description,product:product,date:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some productidea
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "productideas" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addtask= function(email,assigned,completed,description,assigner,now)
{

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeetracker');

            //Create some productideas
            var data = {email:email,assignedat:assigned,completedat:completed,description:description,assigner:assigner,postdate:now};


            /* var user2 = {name: 'modulus user', age: 22, roles: ['user']};
             var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};*/

            // Insert some productidea
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "employeetracker" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var updateuser = function(cred,callback)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            if(cred.newemail==""&&cred.newname!="")
            {
                collection.update({ email: cred.email },
                    { $set:
                    {
                        name:cred.newname,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('User Profile Updated');
                    }
                    db.close();
                });
                callback(0);
            }

            else if(cred.newemail!=""&&cred.newname=="")
            {
                collection.update({email:cred.email },
                    { $set:
                    {
                        email:cred.newemail,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(1);
            }

            else if(cred.newemail!=""&&cred.newname!="")
            {
                collection.update({email:cred.email },
                    { $set:
                    {
                        email:cred.newemail,
                        name:cred.newname,
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(1);
            }


            else if(cred.newemail==""&&cred.newname=="")
            {
                collection.update({ email: cred.email },
                    { $set:
                    {
                        employeeid:cred.newemployeeid,
                        joining_date:cred.newjoining,
                        position:cred.newposition
                    }
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('User Profile Updated');
                        }

                        db.close();
                    });
                callback(0);
            }

        }
    });
}


///////////////////////////////////////////FETCHING/////////////////////////////////////////////////////////////////

/* var fetcher= function(callback) {

    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/HippoFeedo';

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
} */

var addmeeting= function(email,requestdate,reason,priority,companions,message)
{

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('waitingqueue');

            //Create some meeting
            var data = {email:email,requestdate:requestdate,reason:reason,priority:priority,companions:companions,message:message};


            // Insert some meeting
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "waitingqueue" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


var addexperience= function(email,title,description,postdate)
{
    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeeexperience');

            //Create some experience
            var data = {email:email,title:title,description:description,postdate:postdate};

            // Insert some experience
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "employeeexperience" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}


//////////////////////////////////////////////ADMIN CONNCECTIONS///////////////////////////////////////////////////

var loadcomplaints= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('complaints');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}

var loadsuggestions= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('suggestions');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}


var loadideas= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('productideas');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}

var loadname=function(email,callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            collection.findOne({email:email},{name:1,_id:0},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    callback(result);
                }

            });
        }
    });
}


var loadallnames= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employees');

            collection.find({},{name:1,email:1,_id:0}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}


var loadtasks= function(email,callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeetracker');

            collection.find({email:email}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    callback(result);
                }

            });
        }
    });
}


var loadallmeetings= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('waitingqueue');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}

var loadexperience= function(email,callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeeexperience');

            collection.find({email:email}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    callback(result);
                }

            });
        }
    });
}

var removetask= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeetracker');

            var email=cred.email;
            var taskid=cred.taskid;

            var objectId = new ObjectID(taskid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var removeexperience= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('employeeexperience');

            var email=cred.email;
            var experienceid=cred.experienceid;
            var objectId = new ObjectID(experienceid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var removemeeting= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('waitingqueue');

            var email=cred.email;
            var meetingid=cred.meetingid;
            var objectId = new ObjectID(meetingid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var removeidea= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('productideas');

            var email=cred.email;
            var ideaid=cred.ideaid;
            var objectId = new ObjectID(ideaid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var removesuggestion= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('suggestions');

            var email=cred.email;
            var suggestionid=cred.suggestionid;
            var objectId = new ObjectID(suggestionid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var removecomplaint= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('complaints');

            var email=cred.email;
            var complaintid=cred.complaintid;
            var objectId = new ObjectID(complaintid);
            collection.findOneAndDelete({email:email,_id:objectId},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


/* var removeall= function(doc,callback) {

    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;

    var ObjectID = require('mongodb').ObjectID;

    var url = 'mongodb://localhost:27017/HippoFeedo';

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection(doc);

            collection.drop(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Removed Full Collection!");
                    console.log(result)
                }
                db.close();
            });
        }
    });
} */


var loadmymeetings= function(email,callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('waitingqueue');

            collection.find({email:email}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}


var addmessage= function(cred,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('waitingqueue');

            var meetid=cred.meetid;
            var message=cred.message;
            var objectId = new ObjectID(meetid);
            collection.findOneAndUpdate({_id:objectId},{$set:{message:message}},function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Message added!");
                    callback(result);
                }
                db.close();
            });
        }
    });
}


var loadallupdates= function(callback) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('hippoupdates');

            collection.find({}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}

var loadupdateabout= function(updateid,callback) {

    var ObjectID = require('mongodb').ObjectID;

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('hippoupdates');

            var objectId = new ObjectID(updateid);

            collection.find({_id:objectId}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    callback(result);
                }

            });
        }
    });
}


var addupdate= function(title,description,now) {

    MongoClient.connect(url, function (err, db) {
        if (err) {

            console.log('Unable to connect to the mongoDB server. Error:', err);
        }

        else {
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('hippoupdates');

            //Create some meeting
            var data = {title:title,description:description,date:now};


            // Insert some meeting
            collection.insert(data, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "waitingqueue" collection. The documents inserted with "_id" are:', result.length, result);
                }

                db.close();
            });

        }
    });
}



module.exports.add=add;
module.exports.check=check;
module.exports.checkDuplicate = checkDuplicate;
module.exports.addcomplaint=addcomplaint;
module.exports.addsuggestion=addsuggestion;
module.exports.addidea=addidea;
module.exports.addtask=addtask;
module.exports.updateuser=updateuser;
//module.exports.fetcher=fetcher;
module.exports.addmeeting=addmeeting;
module.exports.addexperience=addexperience;
///admin connections////
module.exports.loadcomplaints=loadcomplaints;
module.exports.loadsuggestions=loadsuggestions;
module.exports.loadideas=loadideas;
module.exports.loadname=loadname;
module.exports.loadallnames=loadallnames;
module.exports.loadtasks=loadtasks;
module.exports.loadallreason=loadtasks;
module.exports.loadallmeetings=loadallmeetings;
module.exports.loadexperience=loadexperience;
module.exports.removetask=removetask;
module.exports.removeexperience=removeexperience;
module.exports.removemeeting=removemeeting;
module.exports.removeidea=removeidea;
module.exports.removesuggestion=removesuggestion;
module.exports.removecomplaint=removecomplaint;
/*module.exports.removeall=removeall;*/
module.exports.loadmymeetings=loadmymeetings;
module.exports.addmessage=addmessage;
module.exports.loadallupdates=loadallupdates;
module.exports.loadupdateabout=loadupdateabout;
module.exports.addupdate=addupdate;
