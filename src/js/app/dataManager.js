window.dataManager = (function() {
  var obj = {};
  obj.countries;

  obj.createContact = function(contact) {
    var success = null;
    var error = null;

    window.database_api.insert(contact, function(err, newContact) {
      if (err) {
        (error)?error(err):null;
      } else {
        (success)?success(newContact):null;
        viewManager.update();
      }
    });

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  };

  obj.findContact = function(query) {
    var success = null;
    var error = null;

    window.database_api.find(query, { firstName: 1 }, function(err, contacts) {
      if (err) {
        (error)?error(err):null;
      } else {
        (success)?success(contacts):null;
      }
    });

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.listContacts = function() {
    var success = null;
    var error = null;

    window.database_api.find({}, { firstName: 1 }, function(err, contacts) {
      if (err) {
        (error)?error(err):null;
      } else {
        (success)?success(contacts):null;
      }
    });

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.updateContact = function(query, changes) {
    var success = null;
    var error = null;

    window.database_api.update(query, changes, function(err, contacts) {
      if (err) {
        (error)?error(err):null;
      } else {
        (success)?success(contacts):null;
        viewManager.update();
      }
    });

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.deleteContact = function(query) {
    var success = null;
    var error = null;

    window.database_api.delete(query, function(err, numRemoved) {
      if (err) {
        (error)?error(err):null;
      } else {
        (success)?success(numRemoved):null;
        viewManager.update();
      }
    });

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }


  //countries
  //http://data.okfn.org/data/core/country-list/r/data.json
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      obj.countries = JSON.parse(xhttp.response);
    }
  };
  xhttp.open("GET", 'http://data.okfn.org/data/core/country-list/r/data.json', true);
  xhttp.send();

  window.allReadyNumber = window.allReadyNumber?window.allReadyNumber+1:1;
  return obj;
})();
