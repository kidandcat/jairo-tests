window.allReadyNumber = window.allReadyNumber?window.allReadyNumber+1:1;
window.allReadyStart = function(){
  window.viewManager.loadView('contacts').then(function(ee) {
    window.viewManager.renderView('contacts', 'viewManager.contacts').then(function() {

    });
  }).error(function(e) {
    alert(e);
  });

  window.viewManager.loadView('form').error(function(e) {
    alert(e);
  });
};






/*
 * * * * * * * * *
 *  Console API  *
 * * * * * * * * *
*/

function createContact(contact) {
  window.dataManager.createContact(contact).then(function(res) {
    console.log(res);
  }).error(function(err) {
    console.log('err: ' + err);
  });
};

function updateContacts(query, contact) {
  window.dataManager.updateContact(query, contact).then(function(res) {
    console.log(res);
  }).error(function(err) {
    console.log('err: ' + err);
  });
};

function listContacts() {
  window.dataManager.listContacts().then(function(res) {
    console.log(res);
  }).error(function(err) {
    console.log('err: ' + err);
  });
};

function deleteContact(query) {
  window.dataManager.deleteContact(query).then(function(res) {
    console.log(res);
  }).error(function(err) {
    console.log('err: ' + err);
  });
}
