/*
 * * * * * * * * *
 *  View Script  *
 * * * * * * * * *
 *
 * This is a view script, it will be loaded when requesting a load view.
 * It will be executed each time the view is rendered.
 */

//Caching elements
log_info('Caching HTML elements');
var inputs = document.querySelectorAll('.formContainer input');
var select = document.querySelector('.formContainer select');
var backBtn = document.querySelector('#backBtn');
var deleteBtn = document.querySelector('#deleteBtn');
var form = document.querySelector('#form');
var saveBtn = document.querySelector('#saveBtn');
var submit = document.querySelector('#form #submit');
var id = document.querySelector('#id').value;
log_info('Cached HTML elements');



//Adding listeners
log_info('Adding general listeners');
backBtn.addEventListener('click', back);
deleteBtn.addEventListener('click', delete_);
saveBtn.addEventListener('click', save);
inputs[2].addEventListener('keyup', validateMail);
log_info('General listeners added');



//Adding enter key listeners
log_info('Adding enter key listeners');
for (var i = 0; i < inputs.length; i++) { //Looping all form inputs
    inputs[i].addEventListener('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which); //Get keycode
        if (code == 13) { //Enter keycode
            save();
        }
    });
}
log_info('Enter listeners added');



//Country select logic
log_info('Starting country logic');
var selectOpts = ''; //Store all options here
var selected = ''; //This will be the selected option
log_info('Filling country options');
window.dataManager.countries.forEach(function(country) { //Looping countries object
    selected = (selected = !'' && country.Code == select.getAttribute('value')) ? 'selected="selected"' : ''; //If the option code is the same than the select value, we select that option as selected
    selectOpts += "<option " + selected + " value=" + country.Code + ">" + country.Name + "</option>"; //Save all options
});
log_info('Options filled, selected: ', selected);
select.innerHTML = selectOpts; //Put options into the select
log_info('Finished country logic');



//Functions
function back() { //Go back by rendering contacts view
    log_info('Back launched');
    window.viewManager.renderView('contacts', 'viewManager.contacts');
}

function validateMail() { //Validate email
    log_info('Validating email');
    if (typeof this.value.split('@')[1] == 'undefined' || typeof this.value.split('@')[1].split('.')[1] == 'undefined') { //If ! mail contains @ and second part contains .
        log_info('Invalid email: ', this.value);
        this.setCustomValidity('Not a valid email.'); //Mail is not valid, we set an invalid message, this makes that input ti be in invalid state until we don't change it
    } else { //Valid mail
        log_info('Valid email: ', this.value);
        this.setCustomValidity(''); //Clean invalid message, which clean invalid state too
    }
}

function delete_() { // _ because delete is a reserver word
    log_info('Delete launched');
    var contact = { //Creating Contact structure to find coincidences
        firstName: inputs[0].value, //First name input value
        lastName: inputs[1].value, //Last name input value
        email: inputs[2].value, //Email input value
        country: select.selectedOptions[0].value //Country selected option value
    };
    log_info('Deleting contact: ', contact)
    window.dataManager.deleteContact(contact).then(function(removed) { //Delete (obj)Contact coincidences
        log_info('Contact deleted: ', contact);
        window.viewManager.renderView('contacts', 'viewManager.contacts'); //Then render contacts (go back)
    }).error(function(e) { //Case error
        log_error(new Error('Error deleting contact', 'form.js', 67)); //Call error manager with usefull info
    });
}

function save() { //Save modified contact
    log_info('Save launched');
    //check if form is not valid
    if (!form.checkValidity()) {
        log_info('Form invalid');
        // If the form is invalid, submit it. The form won't actually submit;
        // this will just cause the browser to display the native HTML5 error messages.
        submit.click();
        return false;
    }

    var contact = { //Creating Contact structure to find coincidences
        firstName: inputs[0].value, //First name input value
        lastName: inputs[1].value, //Last name input value
        email: inputs[2].value, //Email input value
        country: select.selectedOptions[0].value //Country selected option value
    };

    if (id !== '' && typeof id != 'undefined') { //Check if we have an id
        log_info('Updating contact: ', contact);
        window.dataManager.updateContact({ //We have an id, updating the existing Contact
            _id: id //UpdateOne
        }, contact).then(function(n) {
            log_info('Contacts updated: ', n);
            window.viewManager.renderView('contacts', 'viewManager.contacts'); //Then render contacts view
        }).error(function(e) {
            log_error(new Error('Error updating contact', 'form.js', 97)); //Call error manager with usefull info
        });
    } else { //If there isn't id, it is a new contact
        log_info('Creating contact: ', contact);
        window.dataManager.createContact(contact).then(function() {
            log_info('Contact created: ', contact);
            window.viewManager.renderView('contacts', 'viewManager.contacts'); //Rendering contacts view
        }).error(function(e) { //Case error
            log_error(new Error('Error creating contact', 'form.js', 105)); //Call error manager with usefull info
        });
    }
}
