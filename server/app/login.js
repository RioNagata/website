module.exports = function(db, app){
    app.post('/api/login', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        product = req.body;
        console.log(product);
        const collection = db.collection('user');
        collection.find({'username': product.username}).count((err, count) => {
            console.log(count);
            if(count == 1){
                const collection = db.collection('user');
                collection.find({'userid': product.id}).toArray((err, data)=>{
                    console.log(data);
                    res.send(data);
                });
            } else {
                res.send({num:0, err:"duplicate user"});
                console.log("user not found");
            }
        });
    });
}