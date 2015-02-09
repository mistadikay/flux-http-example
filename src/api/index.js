'use strict';

const request = require('api/request');

const api = {
    search: function(query) {
        return request.get('search', {
            query: query
        });
    }
};

module.exports = api;
