var router = new Navigo(root = null, useHash=false);

router.on({
  '/contacts': contacts,
  '/test': test
});

router.on(function () {
  log_error('404 Not found');
});


function contacts(){
  window.viewManager.renderView('contacts', 'viewManager.contacts');
}

function test(){
  alert('nice');
}

function preload(){
  window.viewManager.loadView('contacts');
  window.viewManager.loadView('form');
}
