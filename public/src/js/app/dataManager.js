window.dataManager = (function() {
    var obj = {}; //Module pattern
    obj.countries; //Countries

    obj.createContact = function(contact) { //Low level crud; create
        var success = null; //Promise
        var error = null; //Promise

        log_info('DataManager creating contact: ', contact);
        obj.listContacts().then(function(cc){
          contact._id = cc.length+1;
          window.database_api.insert(contact, function(err, newContact) { //Database insert
              if (err) {
                  (error) ? error(err): null;
              } else {
                  (success) ? success(newContact): null; //Success, call promise
                  //viewManager.update(); //Database modified, trigger update event in view
                  log_info('DataManager contact created');
              }
          });
        });


        //Promise
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


    //Find
    obj.findContact = function(query) {
        var success = null;
        var error = null;

        log_info('DataManager finding contact: ', query);
        window.database_api.find(query, {
            firstName: 1
        }, function(err, contacts) { //Find matching query, order by FirstName: true
            if (err) {
                (error) ? error(err): null;
            } else {
                (success) ? success(contacts): null;
                log_info('Search finished: ', contacts);
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

    //List all contacts
    obj.listContacts = function() {
        var success = null;
        var error = null;

        log_info('DataManager list all contacts');
        window.database_api.find({}, {
            firstName: 1
        }, function(err, contacts) { //Empty query, fetch all, order by FirstName: true
            if (err) {
                (error) ? error(err): null;
            } else {
                (success) ? success(contacts): null;
                log_info('Listed: ', contacts);
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

    //Update contact
    obj.updateContact = function(query, changes) {
        var success = null;
        var error = null;

        log_info('DataManager update contact: ', query);
        log_info('With: ', changes);
        window.database_api.update(query, changes, function(err, contacts) { //match query, update with changes
            if (err) {
                (error) ? error(err): null;
            } else {
                (success) ? success(contacts): null;
                //viewManager.update(); //Database modified, triggering update on the view
                log_info('Updated: ', contacts);
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

    //Delete contact
    obj.deleteContact = function(query) {
        var success = null;
        var error = null;

        log_info('DataManager delete contact: ', query);
        window.database_api.delete(query, function(err, numRemoved) { //Delete matched by query
            if (err) {
                (error) ? error(err): null;
            } else {
                (success) ? success(numRemoved): null;
                //viewManager.update(); //Database modified, triggering update on view
                log_info('Contact deleted: ', numRemoved);
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


    //Fetch countries from:
    //http://data.okfn.org/data/core/country-list/r/data.json
    log_info('DataManager fetching countries');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            obj.countries = JSON.parse(xhttp.response);
            log_info('Countries fetched: ', obj.countries);
        }
    };
    xhttp.open("GET", 'http://data.okfn.org/data/core/country-list/r/data.json', true);
    xhttp.send();

    log_info('DataManager ready!');
    window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1;
    return obj;
})();
