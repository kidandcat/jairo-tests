document.querySelector('#backBtn').addEventListener('click', function(){
  window.viewManager.renderView('contacts', 'viewManager.contacts');
});

document.querySelector('#deleteBtn').addEventListener('click', function(){
  var cc = document.querySelectorAll('.formContainer input');
  var contact = {
    firstName: cc[0].value,
    lastName: cc[1].value,
    email: cc[2].value,
    country: cc[3].value
  }
  window.dataManager.deleteContact(contact).then(function(removed){
    console.log('removed: ' + removed);
    console.log(contact);
    window.viewManager.renderView('contacts', 'viewManager.contacts');
  }).error(function(e){
    log_error(e);
  });
});

document.querySelector('#saveBtn').addEventListener('click', function(){
  var cc = document.querySelectorAll('.formContainer input');
  var contact = {
    firstName: cc[0].value,
    lastName: cc[1].value,
    email: cc[2].value,
    country: cc[3].value
  }
  //TODO Validation
  window.dataManager.createContact(contact).then(function(){
    console.log('Contact created');
    window.viewManager.renderView('contacts', 'viewManager.contacts');
  }).error(function(e){
    log_error(e);
  });
});
