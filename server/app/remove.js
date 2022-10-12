module.exports = function(db,app,ObjectID){
    app.post('/api/remove', function(req, res){
        if(!req.body){
            return res.sendStatus(400);
        }
        productID = req.body.productid;
        const collection = db.collection('user');
        collection.deleteOne({userid:productID}, (err,docs)=> {
            collection.find({}).toArray((err, data)=>{
                res.send((data));
                console.log(data);
            });
        });
    });
}