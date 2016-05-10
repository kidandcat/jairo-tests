window.routeManager = (function() {
    var obj = {};
    var queue = [];
    obj.router = new Navigo();

    obj.router.on({
        '/contacts': contacts,
        '/new': neww,
        '/edit/:id': edit
    });

    obj.router.on(function() {
        obj.router.navigate('contacts');
    });

    //router.navigate('/products/list');

    function contacts() {
        if (window.allReadyNumber < 4) {
            queue.push({
                f: contacts
            });
        } else {
            log_info('Router::Rendering contacts');
            window.viewManager.loadView('contacts');
            window.viewManager.renderView('contacts', 'viewManager.contacts');
        }
    }

    function edit(params) {
        if (window.allReadyNumber < 4) {
            queue.push({
                f: edit,
                p: params
            });
        } else {
            log_info('Router::Rendering edit');
            window.viewManager.loadView('form');
            var contact;
            if (!viewManager.contacts) {
                dataManager.listContacts().then(function(c) {
                    log_info('Contacts: ', c);
                    viewManager.contacts = c;
                    c.forEach(function(cc) {
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
                });
            } else {
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

    function neww() {
        if (window.allReadyNumber < 4) {
            queue.push({
                f: neww
            });
        } else {
            log_info('Router::Rendering new');
            window.viewManager.loadView('form');
            window.viewManager.renderView('form');
        }
    }

    window.allReadyStart = function() {
        queue.forEach(function(ff) {
            ff.f(ff.p);
        });
    }
    log_info('RouteManager ready!');
    window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1; //We are loaded, info
    return obj;
})();
