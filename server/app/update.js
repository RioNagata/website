module.exports = function(db, app){
    app.post('/api/update', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        product = req.body;
        console.log(product);
        const collection = db.collection('products');
        collection.find({'_id': product._id}).count((err, count) => {
            console.log(count);
            if(count == 1){
                collection.updateOne(({_id: product._id}, {$set: {Name: product.Name, Description: product.Description, Price: product.Price, Units: product.Units}}), (err,dbres)=>{
                    if (err) throw err;
                    let num = dbres.insertedCount;
                    res.send({'num': num, err: null});
                    console.log("item updated");
                    console.log(collection);
                });
            } else {
                res.send({num:0, err:"item not available"});
                console.log("item not updated");
            }
        });
    });
}