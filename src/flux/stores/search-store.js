'use strict';

var dispatcher = require('flux/dispatcher');
var EventEmitter = require('eventemitter3');
var eventEmitter = new EventEmitter();
var actionsConstants = require('flux/constants/actions-constants');

var searchResults = null;
var searchError = null;

var SearchStore = {
    getSearchResults: function() {
        return JSON.stringify(searchResults);
    },

    getSearchError: function() {
        return searchError.message;
    },

    emit: function(event) {
        eventEmitter.emit(event);
    },

    on: function(event, callback) {
        eventEmitter.on(event, callback);
    },

    removeListener: function(event, callback) {
        eventEmitter.removeListener(event, callback);
    }
};

dispatcher.register(
    function(action) {
        switch (action.actionType) {

            case actionsConstants.SEARCH_START:
                SearchStore.emit(actionsConstants.SEARCH_START);
                break;

            case actionsConstants.SEARCH_RESULTS:
                searchResults = action.results;
                searchError = null;
                SearchStore.emit(actionsConstants.SEARCH_RESULTS);
                break;

            case actionsConstants.SEARCH_ERROR:
                searchResults = null;
                searchError = action.error;
                SearchStore.emit(actionsConstants.SEARCH_ERROR);
                break;
            default:
            // no op
        }
    }
);

module.exports = SearchStore;
