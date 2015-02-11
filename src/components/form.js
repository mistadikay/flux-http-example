'use strict';

var React = require('react');
var dom = React.DOM;

var searchActions = require('flux/actions/search-actions');
var actionsConstants = require('flux/constants/actions-constants');
var searchStore = require('flux/stores/search-store');

var Form = React.createClass({
    componentDidMount: function() {
        searchStore.on(actionsConstants.SEARCH_START, this.waitResults);
        searchStore.on(actionsConstants.SEARCH_RESULTS, this.loadResutls);
        searchStore.on(actionsConstants.SEARCH_ERROR, this.showError);
    },
    componentWillUnmount: function() {
        searchStore.removeListener(actionsConstants.SEARCH_START, this.waitResults);
        searchStore.removeListener(actionsConstants.SEARCH_RESULTS, this.loadResutls);
        searchStore.removeListener(actionsConstants.SEARCH_ERROR, this.showError);
    },
    getInitialState: function() {
        return {
            isSearching: false,
            error: '',
            results: ''
        };
    },
    onSearchSubmit: function(e) {
        e.preventDefault();
        searchActions.search(this.refs.search.getDOMNode().value);
    },
    waitResults: function() {
        this.setState({
            isSearching: true,
            error: ''
        });
    },
    loadResutls: function() {
        this.setState({
            isSearching: false,
            results: searchStore.getSearchResults()
        });
    },
    showError: function() {
        this.setState({
            isSearching: false,
            error: searchStore.getSearchError(),
            results: ''
        });
    },
    getSearchStatusContent: function() {
        var state = this.state;

        if (state.isSearching) {
            return 'loading...';
        } else if (state.error) {
            return 'ERROR! ' + state.error;
        }

        return state.results;
    },
    render: function() {
        return dom.form(
            {
                onSubmit: this.onSearchSubmit
            },
            dom.input(
                {
                    type: 'text',
                    ref: 'search',
                    placeholder: 'search'
                }
            ),
            dom.input(
                {
                    type: 'submit',
                    value: 'HIT ME!'
                }
            ),
            dom.div(
                null,
                this.getSearchStatusContent()
            )
        );
    }
});

module.exports = React.createFactory(Form);
