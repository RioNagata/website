module.exports = function(db, app){
    app.post('/api/login', function(req, res){
        if(!req.body){
            res.sendStatus(400);
        }
        product = req.body;
        // checks the database with the username and password send from client-side
        const collection = db.collection('user');
        collection.find({'username': product.Username, 'password': product.Password}).count((err, count) => {
            console.log(count);
            // if there's a user with the username and password, send the user's information to the front-end 
            if(count == 1){
                const collection = db.collection('user');
                collection.find({'username': product.Username}).toArray((err, data)=>{
                    res.send(data);
                });
            } else {
                // if not, give error
                res.send({num:0, err:"duplicate user"});
                console.log("user not found");
            }
        });
    });
}