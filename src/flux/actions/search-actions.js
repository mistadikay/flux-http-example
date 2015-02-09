'use strict';

const api = require('api');
const dispatcher = require('flux/dispatcher');
const actionsConstants = require('flux/constants/actions-constants');

let isSearching = false;

const searchActions = {

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
