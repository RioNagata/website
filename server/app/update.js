module.exports = function(db, app){
    app.post('/api/update', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        product = req.body;
        console.log(product);
        const collection = db.collection('user');
        // finds the user in the database using the data send from front-end
        collection.find({'userid': product.userid}).count((err, count) => {
            console.log(count);
            if(count == 1){
                // if user is found, update the data of the user 
                collection.updateOne({userid: product.userid}, {$set: {username: product.username, email: product.email, password: product.password, userrole: product.userrole}}, (err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null});
                    console.log("item updated");
                });
            } else {
                // if user not found, give error
                res.send({num:0, err:"item not available"});
                console.log("item not updated");
            }
        });
    });
}