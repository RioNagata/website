module.exports = function(db, app){
    app.post('/api/add', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        product = req.body;
        console.log(product);
        const collection = db.collection('products');
        collection.find({'_id': product._id}).count((err, count) => {
            console.log(count);
            if(count == 0){
                collection.insertOne(product, (err,dbres)=>{
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