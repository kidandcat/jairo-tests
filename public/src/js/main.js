/*
 * * * * * * * * *
 *  Main Script  *
 * * * * * * * * *
 *
 * Wait until all scripts have load, then load contacts view and render it.
 * Then load the rest of the views (just form view).
 * Provide a console API.
 */






/*
 * * * * * * * * *
 *  Console API  *
 * * * * * * * * *
 */
//Interfacing the dataManager directly
function createContact(contact) {
    log_info('API create launched');
    window.dataManager.createContact(contact).then(function(res) {
        log_info('Contact created through console API: ', res);
    }).error(function(err) {
        log_error(new Error('Error creating contact', 'main.js', 24));
    });
}

function updateContacts(query, contact) {
    window.dataManager.updateContact(query, contact).then(function(res) {
        log_info('Contact updated through console API: ', res);
    }).error(function(err) {
        log_error(new Error('Error updating contact', 'main.js', 32));
    });
}

function listContacts() {
    window.dataManager.listContacts().then(function(res) {
        log_info('Contacts listed through console API: ', res);
    }).error(function(err) {
        log_error(new Error('Error listing contacts', 'main.js', 40));
    });
}

function deleteContact(query) {
    window.dataManager.deleteContact(query).then(function(res) {
        log_info('Contact deleted through console API: ', res);
    }).error(function(err) {
        log_error(new Error('Error deleting contact', 'main.js', 48));
    });
}
