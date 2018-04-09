import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as LeadActions from '../actions';
import {MuiThemeProvider, createMuiTheme, withTheme } from 'material-ui/styles';
import {blue} from 'material-ui/colors';
import Header from '../components/Header';
import LeadTabs from '../components/LeadTabs';
import Footer from '../components/Footer';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#2196F3',
            dark: '#002884',
            contrast: '#fff',
        },

        type: 'light',
    },
    status: {
        danger: 'orange',
    },
});

const App = ({leads, actions}) => (
    <MuiThemeProvider theme={theme}>
        <div className="App">
            <Header />
            <LeadTabs leads={leads} actions={actions}/>
            <Footer />
        </div>
    </MuiThemeProvider>
)

App.propTypes = {
    leads: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    leads: state.leads
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(LeadActions, dispatch)
});

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(App));
