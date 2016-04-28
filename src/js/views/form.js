document.querySelector('#backBtn').addEventListener('click', back);
document.querySelector('#deleteBtn').addEventListener('click', delete_);
document.querySelector('#saveBtn').addEventListener('click', save);

//Caching elements
var inputs = document.querySelectorAll('input');
var select = document.querySelector('.formContainer select');

//Adding listeners
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) { //Enter keycode
            save();
        }
    });
}

document.querySelectorAll('#form input')[2].addEventListener('keyup', function(){
  if(typeof this.value.split('@')[1] == 'undefined' || typeof this.value.split('@')[1].split('.')[1] == 'undefined'){
    this.setCustomValidity('Not a valid email.');
  }else{
    this.setCustomValidity('');
  }
});

//Country select logic
var selectOpts = '';
var selected = '';
window.dataManager.countries.forEach(function(country){
  selected = (selected =! '' && country.Code == select.getAttribute('value'))?'selected="selected"':'';
  selectOpts += "<option " + selected + " value=" + country.Code + ">" + country.Name + "</option>";
});
select.innerHTML = selectOpts;


//Function
function back() {
    window.viewManager.renderView('contacts', 'viewManager.contacts');
}


function delete_() {
    var cc = document.querySelectorAll('.formContainer input');
    var contact = {
        firstName: cc[0].value,
        lastName: cc[1].value,
        email: cc[2].value,
        country: select.selectedOptions[0].value
    };
    window.dataManager.deleteContact(contact).then(function(removed) {
        console.log('removed: ' + removed);
        console.log(contact);
        window.viewManager.renderView('contacts', 'viewManager.contacts');
    }).error(function(e) {
        log_error(e);
    });
}


function save() {
    var form = document.querySelector('#form');
    //check if its not valid
    if (!form.checkValidity()) {
      var submit = document.querySelector('#form #submit');
      submit.click();
      // If the form is invalid, submit it. The form won't actually submit;
      // this will just cause the browser to display the native HTML5 error messages.
      return false;
    }

    var id = document.querySelector('#id').value;
    var cc = document.querySelectorAll('.formContainer input');
    var contact = {
        firstName: cc[0].value,
        lastName: cc[1].value,
        email: cc[2].value,
        country: select.selectedOptions[0].value
    };
    if (id != '' && typeof id != 'undefined') {
        window.dataManager.updateContact({
            _id: id
        }, contact).then(function() {
            console.log('Contact created');
            window.viewManager.renderView('contacts', 'viewManager.contacts');
        }).error(function(e) {
            log_error(e);
        });
    } else {
        window.dataManager.createContact(contact).then(function() {
            console.log('Contact created');
            window.viewManager.renderView('contacts', 'viewManager.contacts');
        }).error(function(e) {
            log_error(e);
        });
    }
    //TODO Validation
}
