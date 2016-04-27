window.log_error = function(err) {
  throw new Error(err);
}

window.allReadyNumber = window.allReadyNumber?window.allReadyNumber+1:1;

var xx = setInterval(function() {
  if (window.allReadyNumber == 4) {
    clearInterval(xx);
    window.allReadyStart();
  }
}, 100);
