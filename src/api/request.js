'use strict';

const request = require('superagent');

const API_URL = 'http://private-99df4a-fluxhttpexample.apiary-mock.com/';
const HEADERS = {
    Accept: 'application/json'
};

const buildRequest = function(httpMethod, apiMethod, params) {
    const url = API_URL + apiMethod;

    // depending on http method it's either 'query' or 'send' for sending paramaters with request
    const paramsTransport = httpMethod === 'get' ? 'query' : 'send';

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
    get: function(apiMethod, queryParams, bodyParams) {

        return buildRequest('get', apiMethod, queryParams, bodyParams);
    }
    // post, put, etc.
};
