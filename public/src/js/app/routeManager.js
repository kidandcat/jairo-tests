window.routeManager = (function() {
    var obj = {};
    var queue = [];
    obj.router = new Navigo();

    obj.router.on({ //Set client app routes
        '/contacts': contacts, //contacts list
        '/new': neww, //new contact
        '/edit/:id': edit //edit contact
    });

    obj.router.on(function() { //Default path
        obj.router.navigate('contacts');
    });

    //router.navigate('/products/list');  how to use

    function contacts() {
        if (window.allReadyNumber < 4) { //check if all scripts loaded
            queue.push({ //push this function to the queue as all scripts are not loaded
                f: contacts
            });
        } else {
            log_info('Router::Rendering contacts');
            window.viewManager.loadView('contacts'); //load view 'contacts'
            window.viewManager.renderView('contacts', 'viewManager.contacts'); //render view 'contacts'
        }
    }

    function edit(params) { //edit contact
        if (window.allReadyNumber < 4) { //check if all scripts loaded
            queue.push({ //push this function to the queue as all scripts are not loaded
                f: edit,
                p: params
            });
        } else {
            log_info('Router::Rendering edit');
            window.viewManager.loadView('form'); //load view 'form'
            var contact;
            if (!viewManager.contacts) { //if contacts list is already loaded, read it else
                dataManager.listContacts().then(function(c) { //ask dataManager for all contacts
                    log_info('Contacts: ', c);
                    viewManager.contacts = c; //save the list into the viewManager.contacts
                    c.forEach(function(cc) { //loop all contacts
                        log_info('Contact: ', cc);
                        if (cc._id == params.id) { //if we find the id we are looking for
                            contact = cc; //select it
                        }
                    });
                    if (contact) { // if we found a matching id
                        window.viewManager.renderView('form', contact); //render form with that contact data
                    } else {
                        obj.router.navigate('404'); //else, not found
                    }
                });
            } else {
              //mimic top behavior
                viewManager.contacts.forEach(function(cc) {
                    log_info('Contact: ', cc);
                    if (cc._id == params.id) {
                        contact = cc;
                    }
                });
                if (contact) {
                    window.viewManager.renderView('form', contact);
                } else {
                    obj.router.navigate('404');
                }
            }
        }
    }

    function neww() { //new contact
        if (window.allReadyNumber < 4) {//check if all scripts loaded
            queue.push({//push this function to the queue as all scripts are not loaded
                f: neww
            });
        } else {
            log_info('Router::Rendering new');
            window.viewManager.loadView('form');
            window.viewManager.renderView('form');
        }
    }

    window.allReadyStart = function() { //application startpoint, it is launched when all scripts are loaded
        queue.forEach(function(ff) { //loop the queue
            ff.f(ff.p || null); //launch the function ff.f with the params ff.p if they exists or null
        });
    }
    log_info('RouteManager ready!');
    window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1; //We are loaded, info
    return obj;
})();
