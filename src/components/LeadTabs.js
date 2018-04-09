import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import ActiveLeads from './leads/ActiveLeads';

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8*3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});

class BasicTabsWrappedLabel extends React.Component {
  state = {
    value: 'active',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

    render() {
    const { classes, leads, actions } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto">
            <Tab value="active" label="Active" />
            <Tab value="dead" label="Dead" />
            <Tab value="newLeads" label="New Leads" />
            <Tab value="myLeads" label="My Leads" />
          </Tabs>
        </AppBar>
        {value === 'active' && <TabContainer><ActiveLeads leads={leads} actions={actions} /></TabContainer>}
        {value === 'dead' && <TabContainer>Dead Leads</TabContainer>}
        {value === 'newLeads' && <TabContainer>New Leads</TabContainer>}
        {value === 'myLeads' && <TabContainer>My Leads</TabContainer>}
      </div>
    );
  }
}

BasicTabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicTabsWrappedLabel);
