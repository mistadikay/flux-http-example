'use strict';

var api = require('api');
var dispatcher = require('flux/dispatcher');
var actionsConstants = require('flux/constants/actions-constants');

var isSearching = false;

var searchActions = {

    search: function(query) {
        if (!isSearching) {
            isSearching = true;
            dispatcher.dispatch({
                actionType: actionsConstants.SEARCH_START
            });
            api.search(query)
                .then(
                    function(result) {
                        dispatcher.dispatch({
                            actionType: actionsConstants.SEARCH_RESULTS,
                            results: result
                        });
                        isSearching = false;
                    },
                    function(error) {
                        dispatcher.dispatch({
                            actionType: actionsConstants.SEARCH_ERROR,
                            error: error
                        });
                        isSearching = false;
                    }
                );
        }
    }

};

module.exports = searchActions;
