module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        user = req.body;
        const collection = db.collection('user');
        collection.find({'userid': user.userid}).count((err, count) => {
            if(count == 0){
                collection.insertOne(user, (err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null});
                    console.log("user inserted");
                });
            } else {
                res.send({num:0, err:"duplicate user"});
                console.log("user not inserted");
            }
        });
    });
}