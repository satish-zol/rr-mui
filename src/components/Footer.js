import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    width: '100%',
  },
};

const Footer = (props) => {
  const { classes } = props;
  return (
    <div>
      <Paper></Paper>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
