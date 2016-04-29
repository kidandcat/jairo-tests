/*
 * * * * * * * * *
 *  View Script  *
 * * * * * * * * *
 *
 * This is a view script, it will be loaded when requesting a load view.
 * It will be executed each time the view is rendered.
 */

//Caching elements
var cc = document.querySelectorAll('#target .contact');
var cc2 = document.querySelectorAll('#target .editBtn');


//Adding info click listeners
log_info('Adding info click listeners');
for (var i = 0; i < cc.length; i++) {
  cc[i].addEventListener('click', function() {
    var x = this;
    x.querySelector('.info').classList.toggle('animationInfo');
    x.classList.toggle('animationContact');
  });
}

//Adding edit button listeners
log_info('Adding edit button listeners');
for (var i = 0; i < cc2.length; i++) {
  cc2[i].addEventListener('click', function(event) {
    if(event.stopPropagation) event.stopPropagation(); //Stop propagation for not triggering info click event too
    var id = this.parentNode.querySelector('input').value;
    log_info('Locating contact by id');
    viewManager.contacts.forEach(function(c){ //Locate contact by id
      if(c._id == id){ //If we get a match
        log_info('Contact located, rendering ');
        viewManager.renderView('form', 'viewManager.contacts[' + viewManager.contacts.indexOf(c) + ']'); //Render form with data source the contact found
      }
    });
  });
}

//Adding new button listener
log_info('Adding new button listener');
document.querySelector('#newBtn').addEventListener('click', function(){
  log_info('Rendering form view');
  viewManager.renderView('form'); //Render form without any data
});
