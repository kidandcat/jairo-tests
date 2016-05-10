//Example -> log_error(new Error('Error deleting contact', 'form.js', 67));
window.log_error = function(err) {
    throw err;
}

//Example -> log_info('info message', optionalObject);
window.log_info = function(msg, object) {
    console.log(msg, object || '');
};

window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1; //Scripts loaded, ++ or initialize
log_info('ErrorManager ready!');


//Checking if all scripts have been loaded
var xx = setInterval(function() {
    if (window.allReadyNumber == 4) {
        clearInterval(xx);
        log_info('All scripts async loaded, launching "allReadyStart"');
        window.allReadyStart && window.allReadyStart();//All scripts have been loaded, launching start function
    }
}, 100);
