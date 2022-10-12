module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        user = req.body;
        const collection = db.collection('user');
        // checks the database is there is already a user with userid
        collection.find({'userid': user.userid}).count((err, count) => {
            if(count == 0){
                // if no user, insert the user into collection
                collection.insertOne(user, (err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null});
                    console.log("user inserted");
                });
            } else {
                // if not, send error message
                res.send({num:0, err:"duplicate user"});
                console.log("user not inserted");
            }
        });
    });
}