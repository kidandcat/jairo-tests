window.viewManager = (function() {
  var obj = {};
  var actualView = '';
  var actualUpdater = '';
  var _views = {};
  var _scripts = {};
  obj.contacts = [];

  obj.loadView = function(viewName) {
    var success = null;
    var error = null;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        _views[viewName] = xhttp.response;
        obj.loadScript(viewName).then(function(){
          (success || Function)(_views);
        });
      } else if (xhttp.readyState == 4) {
        (error || Function)(xhttp.status);
      }
    };
    xhttp.open("GET", "/src/views/" + viewName + '.html', true);
    xhttp.send();

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.loadScript = function(viewName) {
    var success = null;
    var error = null;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        _scripts[viewName] = "/src/js/views/" + viewName + '.js';
        (success || Function)();
      } else if (xhttp.readyState == 4) {
        (error || Function)(xhttp.status);
      }
    };
    xhttp.open("GET", "/src/js/views/" + viewName + '.js', true);
    xhttp.send();

    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.renderView = function(viewName, updateQuery) {
    var success = null;
    var error = null;

    if (_views && _views[viewName]) {
      actualView = viewName;
      actualUpdater = updateQuery;
      obj.update().then(function(c) {
        obj.contacts = c;
        dataManager.listContacts().then(function(c) {
          obj.contacts = c;
          updateView(actualUpdater);
          obj.renderScript(viewName);
          (success || Function)();
        });
      });
      document.querySelector('body').innerHTML = _views[viewName];
    } else {
      window.log_error('Script does not exists');
    }


    return {
      then: function(cb) {
        success = cb;
        return this;
      },
      error: function(cb) {
        error = cb;
        return this;
      }
    };
  }

  obj.renderScript = function(viewName) {
    if (_scripts[viewName]) {
      var oldScript = document.getElementById("view-script");
      if(oldScript){
        oldScript.parentNode.removeChild(oldScript);
      }
      var ss = document.createElement('script');
      ss.setAttribute('src', _scripts[viewName]);
      ss.setAttribute('id', 'view-script');
      document.querySelector('head').appendChild(ss);
    }
  }

  obj.update = function() {
    return dataManager.listContacts().then(function(c) {
      obj.contacts = c;
      updateView(actualUpdater);
    });
  }



  /*
   * * * * * * * * *
   *  View Engine  *
   * * * * * * * * *
   */

  function updateView(aObjects) {
    if (typeof aObjects == 'string') { //it is a source path, we will access it using eval, it will bind object changes into the view
      var dataSource = eval(aObjects);
    } else { //it is a direct source, we use it, no live reload
      var dataSource = aObjects;
    }

    if (typeof dataSource != 'object') {
      console.log('unknown data source for render "' + actualView + '" view!');
      var target = document.querySelector('#target');
      var template = document.querySelector('#template');
      var code = template.innerHTML;
      target.innerHTML = code;
    } else if (typeof dataSource.forEach != 'function') {
      var target = document.querySelector('#target');
      var template = document.querySelector('#template');
      var code = template.innerHTML;
      target.innerHTML = '';
      var out = code;
      for (var property in dataSource) {
        var out = out.split('##' + property + '##').join(dataSource[property]);
      }
      target.innerHTML += purgeTemplateVars(out);
    } else {
      var target = document.querySelector('#target');
      var template = document.querySelector('#template');
      var code = template.innerHTML;
      target.innerHTML = '';
      dataSource.forEach(function(cc) {
        var out = code;
        for (var property in cc) {
          var out = out.split('##' + property + '##').join(cc[property]);
        }
        target.innerHTML += purgeTemplateVars(out);
      });
    }
  }

  function purgeTemplateVars(code) {
    var aCode = aux = code.split('##');
    var aux = aCode.slice(); //duplicate array
    for (var i = 0; i < aCode.length; i++) {
      if (i % 2 != 0) {
        aux.splice(aux.indexOf(aCode[i]), 1);
      }
    }
    return aux.join('');
  }


  return obj;
})();
