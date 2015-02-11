'use strict';

var request = require('superagent');

var API_URL = 'http://private-99df4a-fluxhttpexample.apiary-mock.com/';
var HEADERS = {
    Accept: 'application/json'
};

var buildRequest = function(httpMethod, apiMethod, params) {
    var url = API_URL + apiMethod;

    // depending on http method it's either 'query' or 'send' for sending paramaters with request
    var paramsTransport = httpMethod === 'get' ? 'query' : 'send';

    return new Promise(
        function(resolve, reject) {
            request[ httpMethod ](url)
                .set(HEADERS)
                [ paramsTransport ](params)
                .on('error',
                    function(error) {
                        reject(error);
                    }
                )
                .end(
                    function(result) {
                        resolve(result.body, result);
                    }
                );
        }
    );
};

module.exports = {
    get: function(apiMethod, params) {

        return buildRequest('get', apiMethod, params);
    }
    // post, put, etc.
};
