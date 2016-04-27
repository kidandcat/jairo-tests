document.querySelector('#backBtn').addEventListener('click', function(){
  window.viewManager.renderView('contacts', 'viewManager.contacts').error(function(e) {
    alert(e);
  });
});
