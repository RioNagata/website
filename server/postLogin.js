var fs = require('fs');

module.exports = function(req, res){
    var u = req.body.username;
    var p = req.body.pwd;
    c = u + p;
    console.log(c);
    fs.readFile('./users.json', 'utf8', function(err, data){
        if (err) throw err;
        let userArray = JSON.parse(data);
        //console.log(userArray);
        let i = userArray.findIndex(user =>
            ((user.email == u) && (user.password == p)));
        if (i == -1) {
            res.send({"ok": false});
        } else {
            res.send({"ok":true, "data": userArray[i]});
            /*console.log(userArray[i]);
            fs.readFile('./group.json', 'utf8', function(err, data){
                if (err) throw err;
                let groupArray = JSON.parse(data);
                let i = groupArray.findIndex(group => (group.userid == user.userid));
                if (i == -1) {
                    res.send({"ok": false});
                } else {
                    console.log(groupArray[i]);
                    //send information to the front-end
                    res.send({"ok":true, "data": userArray[i], "groupData": groupArray[i]});
                }
            });*/
        }
    });
}