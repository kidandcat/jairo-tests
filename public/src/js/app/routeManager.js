window.routeManager = (function() {
    var obj = {};
    var queue = [];
    obj.router = new Navigo();

    obj.router.on({
        '/contacts': contacts,
        '/new': neww
    });

    obj.router.on(function() {
        contacts();
    });

    //router.navigate('/products/list');

    function contacts() {
      if(window.allReadyNumber < 5){
        queue.push(contacts);
      }else{
        log_info('Router::Rendering contacts');
        window.viewManager.loadView('contacts');
        window.viewManager.renderView('contacts', 'viewManager.contacts');
      }
    }

    function neww() {
      if(window.allReadyNumber < 5){
        queue.push(neww);
      }else{
        log_info('Router::Rendering new');
        window.viewManager.loadView('form');
        window.viewManager.renderView('form');
      }
    }

    window.allReadyStart = function(){
      queue.forEach(function(ff){
        ff.call();
      });
    }
    log_info('RouteManager ready!');
    window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1; //We are loaded, info
    return obj;
})();
