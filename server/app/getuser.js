module.exports = function(db,app){
    app.get('/api/getuser', function(req, res){
        const collection = db.collection('user');
        collection.find({}).toArray((err, data)=>{
            console.log(data);
            res.send(data);
        });
    });
}