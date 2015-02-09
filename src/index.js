'use strict';

const React = require('react');
const dom = React.DOM;

const searchActions = require('flux/actions/search-actions');
const actionsConstants = require('flux/constants/actions-constants');
const searchStore = require('flux/stores/search-store');

const Form = React.createClass({
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
        const state = this.state;

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
                    ref: 'search'
                }
            ),
            dom.div(
                null,
                this.getSearchStatusContent()
            )
        );
    }
});

React.render(React.createFactory(Form)(), document.body);
