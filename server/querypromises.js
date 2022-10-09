const { Collection } = require("mongodb")

module.exports = {
    updatedata: function(db, result){
        const collection = db.collection('products');
        Collection.findOne({id: '1'})
            .then(response => {
                let updatedvalues = {$set:{units:response.units-1}};
                return collection.updateOne({id:response.id}, updatedvalues);
            })
        .then(() => collection.find().toArray())
        .then(response => result(response))
        .catch(err => console.error("Error = " + err));
    }
}