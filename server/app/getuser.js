module.exports = function(db,app){
    app.get('/api/getuser', function(req, res){
        // get users infomation and put it in array
        const collection = db.collection('user');
        collection.find({}).toArray((err, data)=>{
            console.log(data);
            res.send(data);
        });
    });
}