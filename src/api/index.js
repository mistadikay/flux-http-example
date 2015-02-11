'use strict';

var request = require('api/request');

var api = {
    search: function(query) {
        return request.get('search', {
            query: query
        });
    }
};

module.exports = api;
