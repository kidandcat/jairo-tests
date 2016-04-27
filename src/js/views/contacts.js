var cc = document.querySelectorAll('#target .contact');
for (var i = 0; i < cc.length; i++) {
  console.log('adding event listener to ' + cc[i]);
  cc[i].addEventListener('click', function() {
    var id = this.querySelector('input').value;
    viewManager.contacts.forEach(function(c){
      if(c._id == id){
        viewManager.renderView('form', 'viewManager.contacts[' + viewManager.contacts.indexOf(c) + ']');
      }
    });
  });
}
