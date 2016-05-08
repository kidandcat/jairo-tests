window.viewManager = (function() {
    var obj = {}; //Module pattern
    var actualView = ''; //Actual rendered view
    var actualUpdater = ''; //Actual view update data source
    var _views = {}; //All views loaded
    var _scripts = {}; //All scripts loaded
    obj.contacts = []; //Contacts list, local copy updated from the dataManager


    obj.loadView = function(viewName) { //Load a view and save it
        var success = null; //Promise
        var error = null; //Promise

        //Code BEGIN
        //Ajax request to src/views/ viewname
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                _views[viewName] = xhttp.response; //Saving view html
                obj.loadScript(viewName).then(function() { //Download view script
                    (success) ? success(_views): null; //We are done, calling promise
                });
            } else if (xhttp.readyState == 4) {
                (error) ? error(xhttp.status): null;
            }
        };
        xhttp.open("GET", "src/views/" + viewName + '.html', true);
        xhttp.send();
        //Code END

        //Promise
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


    //Mimic loadView
    obj.loadScript = function(viewName) {
        var success = null;
        var error = null;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                _scripts[viewName] = "src/js/views/" + viewName + '.js';
                (success) ? success(): null;
            } else if (xhttp.readyState == 4) {
                (error) ? error(xhttp.status): null;
            }
        };
        xhttp.open("GET", "src/js/views/" + viewName + '.js', true);
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

    obj.renderView = function(viewName, updateQuery) { //Render a view
        var success = null; //Promise
        var error = null; //Promise

        if (_views && _views[viewName]) { //if view exists
            log_info('ViewManager rendering view ', viewName);
            document.querySelector('body').classList.remove('animate'); //Remove .animation for smooth transition (opacity 1 to 0)
            actualView = viewName; //Actual view udpate
            actualUpdater = updateQuery || null;
            dataManager.listContacts().then(function(c) {
                document.querySelector('body').innerHTML = _views[viewName]; //Load view HTML into body
                document.querySelector('body').classList.add('animate'); //Animate body (opacity 0 to 1)
                obj.contacts = c; //Update local contacts copy
                updateView(actualUpdater); //Update our view
                obj.renderScript(viewName); //Render view script
                (success) ? success(): null; //Call promise
            });
        } else {
            log_error('View does not exists');
        }


        //Promise
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
        if (_scripts[viewName]) { //If view script exists
            //Remove old script
            var oldScript = document.getElementById("view-script");
            if (oldScript) {
                oldScript.parentNode.removeChild(oldScript);
            }
            //Create script element
            var ss = document.createElement('script');
            ss.setAttribute('src', _scripts[viewName]);
            ss.setAttribute('id', 'view-script');
            //Add view script
            document.querySelector('head').appendChild(ss);
        }
    }

    obj.update = function() {
        //Get contacts list from dataManager
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

    function updateView(aObjects) { //Run each time the database is modified
        log_info('UpdateView launched');
        var dataSource;
        if (typeof aObjects == 'string') { //it is a source path, we will access it using eval, it will bind object changes into the view
            log_info('Got dataSource path, eval it');
            dataSource = eval(aObjects);
        } else { //it is a direct source, we use it, no live reload
            log_info('Got direct dataSource');
            dataSource = aObjects;
        }

        var target = document.querySelector('#target');
        var template = document.querySelector('#template');
        var code = template.innerHTML;
        target.innerHTML = '';

        if (dataSource && typeof dataSource.forEach != 'function') { //If source is an object but dont have forEach (we have only 1 element)
            log_info('DataSource single element: ', dataSource);
            var out = code;
            for (var property in dataSource) { //Loop single element properties and replace
                var out = out.split('##' + property + '##').join(dataSource[property]);
            }
            log_info('Template populated');
            target.innerHTML += purgeTemplateVars(out);
        } else if (dataSource) { //Data source exists and has forEach (multiple elements)
            log_info('DataSource multi elements: ', dataSource);
            dataSource.forEach(function(cc) { //Loop elements
                var out = code;
                for (var property in cc) { //Loop each element properties
                    var out = out.split('##' + property + '##').join(cc[property]);
                }
                log_info('Template populated');
                target.innerHTML += purgeTemplateVars(out);
            });
        } else { //No data source, just render view
            log_info('No dataSource');
            target.innerHTML += purgeTemplateVars(code);
        }
    }

    function purgeTemplateVars(code) { //After replacing vars, delete the rest pseudo vars in template (##var##)
        log_info('Purgin template vars');
        var aCode = aux = code.split('##');
        var aux = aCode.slice(); //duplicate array
        for (var i = 0; i < aCode.length; i++) {
            if (i % 2 != 0) {
                aux.splice(aux.indexOf(aCode[i]), 1);
            }
        }
        log_info('Template cleared');
        return aux.join('');
    }

    log_info('ViewManager ready!');
    window.allReadyNumber = window.allReadyNumber ? window.allReadyNumber + 1 : 1; //We are loaded, info
    return obj;
})();
