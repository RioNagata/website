module.exports = {
    updatedata: function(db,result){
        const collection = db.collection('products');
        collection.findOne({id: '1'}, function(err, res){
            let updatesvalues = {$set:{units:res.units-1}}
            collection.updateOne({id:'1'}, updatesvalues, function(err,res){
                if(err) throw err;
                    collection.find().toArray(function(err,res){
                        result(res);
                    });
            });
        });
    }
}