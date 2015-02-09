'use strict';

const dispatcher = require('flux/dispatcher');
const events = require('eventemitter3');
const eventEmitter = new events.EventEmitter();
const actionsConstants = require('flux/constants/actions-constants');

let searchResults = null;
let searchError = null;

const SearchStore = {
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
