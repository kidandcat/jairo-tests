window.dataManager = (function() {
  var obj = {};

  obj.createContact = function(contact) {
    var success = null;
    var error = null;

    window.database_api.insert(contact, function(err, newContact) {
      if (err) {
        (error || Function)(err);
      } else {
        (success || Function)(newContact);
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
        (error || Function)(err);
      } else {
        (success || Function)(contacts);
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
        (error || Function)(err);
      } else {
        (success || Function)(contacts);
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
        (error || Function)(err);
      } else {
        (success || Function)(contacts);
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
        (error || Function)(err);
      } else {
        (success || Function)(numRemoved);
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

  return obj;
})();
