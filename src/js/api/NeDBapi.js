window.database_api = (function(){
  var obj = {};
  var _db = new Nedb({ filename: 'MavrixTech', autoload: true });

  obj.insert = function(doc, cb){
    _db.insert(doc, cb);
  }

  //TODO move sort up, to dataManager
  obj.find = function(query, sort, cb){
    _db.find(query).sort(sort || {}).exec(cb);
  }

  obj.update = function(query, changes, cb){
    _db.update(query, { $set: changes }, { multi: true }, cb);
  }

  obj.delete = function(query, cb){
    _db.remove(query, { multi: true }, cb);
  }

  return obj;
})();
