document.querySelector('#backBtn').addEventListener('click', back);
document.querySelector('#deleteBtn').addEventListener('click', delete_);
document.querySelector('#saveBtn').addEventListener('click', save);
var inputs = document.querySelectorAll('input');

for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) { //Enter keycode
            save();
        }
    });
}


function back() {
    window.viewManager.renderView('contacts', 'viewManager.contacts');
}


function delete_() {
    var cc = document.querySelectorAll('.formContainer input');
    var contact = {
        firstName: cc[0].value,
        lastName: cc[1].value,
        email: cc[2].value,
        country: cc[3].value
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
    var id = document.querySelector('#id').value;
    var cc = document.querySelectorAll('.formContainer input');
    var contact = {
        firstName: cc[0].value,
        lastName: cc[1].value,
        email: cc[2].value,
        country: cc[3].value
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
