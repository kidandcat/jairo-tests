var cc = document.querySelectorAll('#target .contact');
for (var i = 0; i < cc.length; i++) {
  cc[i].addEventListener('click', function() {
    var x = this;
    x.querySelector('.info').classList.toggle('animationInfo');
    x.classList.toggle('animationContact');
  });
}

var cc2 = document.querySelectorAll('#target .editBtn');
for (var i = 0; i < cc2.length; i++) {
  cc2[i].addEventListener('click', function(event) {
    if(event.stopPropagation) event.stopPropagation();
    var id = this.parentNode.querySelector('input').value;
    viewManager.contacts.forEach(function(c){
      if(c._id == id){
        viewManager.renderView('form', 'viewManager.contacts[' + viewManager.contacts.indexOf(c) + ']');
      }
    });
  });
}
document.querySelector('#newBtn').addEventListener('click', function(){
  viewManager.renderView('form');
});
