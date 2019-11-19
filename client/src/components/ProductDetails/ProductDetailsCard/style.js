import { makeStyles, createStyles} from '@material-ui/core';
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";

export const useStyles = makeStyles((theme) => createStyles({
  container: {
    minWidth: 237,
    display: 'none',
    [theme.breakpoints.down(769)]: {
      maxWidth: 287,
      display: 'block',
      marginLeft: '15px',
    },
    [theme.breakpoints.down(561)]: {
      minWidth: 200,
    },
    [theme.breakpoints.down(481)]: {
      maxWidth: '100%',
      marginLeft: 0,
    },
    '& > p': {
      fontSize: '15px',
      color: '#6A86E8',
      textTransform: 'uppercase',
    },
    '& > h2': {
      fontFamily: "'Tungsten Book'",
      textTransform: 'capitalize',
      [theme.breakpoints.down(769)]: {
        fontSize: '48px',
      }
    },
  },
  name: {
    marginTop: 10,
    marginBottom: 15,
  },
  otherColors: {
    marginTop: 20,
    marginBottom: 20,
    height: 24,
    display: 'flex',
    [theme.breakpoints.down(481)]: {
      display: 'none',
    },
    '& > a': {
      marginRight: '8px',
      padding: '2px 7px 0px 7px',
      display: 'inline-block',
      textAlign: 'center',
      backgroundColor: '#EAEAEA',
      color: '#707070',
      borderRadius: '3px',
      textTransform: 'capitalize',
    }
  },
  price: {
    display: 'flex',
    '& > p': {
      marginRight: 10,
      fontSize: 20,
      lineHeight: '24px',
      '&.oldPrice': {
        textDecoration: 'line-through',
        color: '#AAAAAA',
      },
    },
  },
  buttons: {
    width: '100%',
    marginTop: 25,
    boxShadow: 'none',
    [theme.breakpoints.down(481)]: {
      position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 1000,
    },
    '& button': {
      height: 50,
      width: '19.9%',
      fontSize: 14,
      boxShadow: 'none',
      [theme.breakpoints.down(561)]: {
        height: 40,
        fontSize: 10,
      },
      [theme.breakpoints.down(481)]: {
        height: 50,
        fontSize: 14,
      },
      '&:hover': {
        boxShadow: 'none',
      }
    },
    '& .Mui-disabled': {
      background: '#b9b9b9',
    },
    '& .otherBtn': {
      background: 'none',
      color: '#444',
      [theme.breakpoints.down(481)]: {
        background: '#ffffff',
      },
      '&:hover path': {
        fill: '#6686FF'
      }
    }
  },
  categories: {
    [theme.breakpoints.down(481)]: {
      display: 'none',
    }
  },
  formControl: {
    display: 'none',
    margin: theme.spacing(0),
    marginTop: '10px',
    marginBottom: '20px',
    minWidth: 120,
    width: '100%',
    [theme.breakpoints.down(481)]: {
      display: 'block',
    }
  },
  select: {
    width: '100%',
  }
}));

export const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);