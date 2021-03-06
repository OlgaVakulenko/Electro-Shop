/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import DateFnsUtils from '@date-io/date-fns';
// Material UI
import { Button, Checkbox, Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, FormControlLabel, Grid, InputLabel, OutlinedInput, Select, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// Modal sweetalert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UPDATE_CUSTOMER, UPDATE_PASSWORD } from '../../../axios/endpoints';
import { SubscribeLetter } from '../../../commons/Footer/StayInTouch/SubscribeLetter';
import { UnsubscribeLetter } from '../../Unsubscribe/UnsubscribeLetter';
import { dispatchGetCustomer } from '../../../store/auth/actions';
import { enqueueSnackbar } from '../../../store/notification/actions';
// Local imports
import { useStyles } from './style';
import './styleModal.css';

const CustomerInformation = (props) => {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const customerEmpty = {
    firstName: '',
    lastName: '',
    telephone: '',
    email: '',
    newPassword: '',
    oldPassword: '',
    address: '',
    birthdate: new Date(),
    gender: '',
    haveChildren: '',
    haveCar: '',
    eBicycle: '',
    checkedSubscribe: true,
  };

  const [expanded, setExpanded] = useState('panel1');
  const [passwordHidden, setPasswordVisible] = useState(true);
  const PasswordIcon = passwordHidden ? VisibilityIcon : VisibilityOffIcon;
  const [state, setState] = useState({
    ...customerEmpty,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onChange = (stateName) => (event) => {
    if (stateName === 'checkedSubscribe') {
      setState({ ...state, [stateName]: event.target.checked });
    } else {
      setState({ ...state, [stateName]: event.target.value.trim() });
    }
  };
  const handleDateChange = (date) => {
    setState({ ...state, birthdate: date });
  };

  const editCustomerInfo = () => {
    const { getCustomerInfo, notify } = props;
    const {
      firstName, lastName, telephone,
      email, oldPassword, newPassword, address, birthdate,
      gender, haveChildren, haveCar, eBicycle,
      checkedSubscribe,
    } = state;
    const updatedCustomer = {
      firstName,
      lastName,
      telephone,
      email,
      address,
      birthdate,
      gender,
      haveChildren,
      haveCar,
      eBicycle,
    };

    const checkedSubscribeTrueOrFalse = !!checkedSubscribe;

    const newSubscriber = {
      email,
      letterSubject: 'Congratulations! You are new member of our community',
      letterHtml: SubscribeLetter({ email }),
    };

    let updateYourSubscriber;
    if (checkedSubscribeTrueOrFalse) {
      updateYourSubscriber = {
        enabled: checkedSubscribeTrueOrFalse,
        letterSubject: 'Congratulations! You are new member of our community',
        letterHtml: SubscribeLetter({ email }),
      };
    } else {
      updateYourSubscriber = {
        enabled: checkedSubscribeTrueOrFalse,
        letterSubject: 'Unsubscribe',
        letterHtml: UnsubscribeLetter(),
      };
    }

    axios.put(`/subscribers/email/${email}`, updateYourSubscriber)
      .then((updateSubscriber) => {
        if (updateYourSubscriber.enabled) {
          notify('Your information about subscription has been already saved.', 'success');
        } else {
          notify('Your information that you unsubscribed, has been already saved.', 'success');
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 400) {
          axios.post('/subscribers', newSubscriber)
            .then((newSubscriberResult) => {
              notify('Your information about subscription has been already saved.', 'success');
            })
            .catch((error) => {
              const { data } = err.response;
              const message = JSON.stringify(data).replace(/{"/g, ' ').replace(/}/g, ' ').replace(/":/g, ':')
                .replace(/,"/g, '; ');
              notify(message, 'error');
            });
        }
      });

    const passwords = {
      password: oldPassword,
      newPassword,
    };

    if (passwords.newPassword && passwords.password) {
      axios
        .put(UPDATE_PASSWORD, passwords)
        // eslint-disable-next-line no-shadow
        .then((updatedCustomer) => {
          notify('Your password has been saved.', 'success');
          getCustomerInfo();
        })
        .catch((err) => {
          const { data } = err.response;
          const message = JSON.stringify(data).replace(/{"/g, ' ').replace(/}/g, ' ').replace(/":/g, ':')
            .replace(/,"/g, '; ');
          notify(message, 'error');
        });
    }

    const reagexpTemplate = '[0-9]{9}';
    // eslint-disable-next-line max-len
    if (reagexpTemplate.toLocaleString(updatedCustomer.telephone) && updatedCustomer.telephone.length === 9) {
      updatedCustomer.telephone = `+380${updatedCustomer.telephone}`;
    }

    // eslint-disable-next-line max-len
    Object.keys(updatedCustomer).forEach((key) => (updatedCustomer[key] == null || updatedCustomer[key] === '') && delete updatedCustomer[key]);

    axios.put(UPDATE_CUSTOMER, updatedCustomer)
      // eslint-disable-next-line no-shadow
      .then((updatedCustomer) => {
        notify('Your personal information has been saved.', 'success');
        getCustomerInfo();
      })
      .catch((err) => {
        const { data } = err.response;
        const message = JSON.stringify(data).replace(/{"/g, ' ').replace(/}/g, ' ').replace(/":/g, ':')
          .replace(/,"/g, '; ');
        notify(message, 'error');
      });
  };

  const cancelToEditCustomerInfo = () => {
    const { user } = props;
    setState({
      ...state, ...customerEmpty, ...user, newPassword: '', oldPassword: '',
    });
  };

  useEffect(() => {
    const { user } = props;
    setState({
      ...state, ...user, newPassword: '', oldPassword: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const MySwal = withReactContent(Swal);

  const showSwalSaveContactInfo = (event) => {
    event.preventDefault();
    MySwal.fire({
      customClass: {
        cancelButton: 'cancel-button-class',
        content: 'content-class',
        confirmButton: 'confirm-button-class',
        title: 'title-class',
      },
      title: <p style={{ fontFamily: 'Tungsten Book' }}>Save changes?</p>,
      text: 'You have made changes in Contact information section',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '#F8F8F8',
      confirmButtonText: 'Yes, save',
      cancelButtonText: 'No, discard',
    }).then((result) => {
      if (result.value) {
        editCustomerInfo();
      } else {
        cancelToEditCustomerInfo();
      }
    });
  };

  return (
    <React.Fragment>
      <ExpansionPanel
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            className={classes.heading}
            style={{ color: '#6A86E8' }}
          >
            Information
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={classes.expansionPanelDetails}
        >
          <Grid
            className={classes.root}
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.gridFormsInfo}
            >
              <Typography
                variant="h5"
                className={classes.formsInfo}
              >
                Contact information
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="firstName"
                >
                  First Name
                </InputLabel>
                <OutlinedInput
                  id="firstName"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  value={state.firstName}
                  type="text"
                  onChange={onChange('firstName')}
                  labelWidth={80}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="lastName"
                >
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id="lastName"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  type="text"
                  value={state.lastName}
                  onChange={onChange('lastName')}
                  labelWidth={80}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="email"
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="email"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  type="email"
                  value={state.email}
                  onChange={onChange('email')}
                  labelWidth={40}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="telephone"
                >
                  Phone
                </InputLabel>
                <OutlinedInput
                  id="telephone"
                  type="tel"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  placeholder="+380XX XXX XX XX"
                  value={state.telephone}
                  onChange={onChange('telephone')}
                  labelWidth={50}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="newPassword"
                >
                  New password
                </InputLabel>
                <OutlinedInput
                  id="newPassword"
                  type={passwordHidden ? 'password' : 'text'}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  value={state.newPassword}
                  onChange={onChange('newPassword')}
                  labelWidth={115}
                  fullWidth
                  endAdornment={
                    state.newPassword
                      ? (
                        <PasswordIcon
                          style={{ cursor: 'pointer', userSelect: 'none' }}
                          onTouchStart={() => setPasswordVisible(false)}
                          onMouseDown={() => setPasswordVisible(false)}
                          onTouchEnd={() => setPasswordVisible(true)}
                          onMouseUp={() => setPasswordVisible(true)}
                        />
                      ) : null
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel classes={{ root: classes.label }} htmlFor="oldPassword">
                  Old password
                </InputLabel>
                <OutlinedInput
                  id="oldPassword"
                  type="password"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  value={state.oldPassword}
                  onChange={onChange('oldPassword')}
                  labelWidth={105}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.gridFormsInfo}
            >
              <Typography
                variant="h5"
                className={classes.formsInfo}
              >
                Shipping Address
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
            >
              <FormControl
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel
                  classes={{ root: classes.label }}
                  htmlFor="address"
                >
                  Address
                </InputLabel>
                <OutlinedInput
                  id="address"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.input,
                  }}
                  type="text"
                  value={state.address}
                  onChange={onChange('address')}
                  labelWidth={60}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              className={classes.gridFormsInfo}
            >
              <Typography
                variant="h5"
                className={classes.formsInfo}
              >
                Personal Information
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  htmlFor="birthdate"
                  InputProps={{ className: classes.inputDate }}
                  InputLabelProps={{ className: classes.labelDate }}
                  id="birthdate"
                  autoOk
                  disableFuture
                  variant="inline"
                  inputVariant="outlined"
                  label="Date of Birth"
                  format="dd/MM/yyyy"
                  openTo="year"
                  value={state.birthdate}
                  InputAdornmentProps={{ position: 'end' }}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  ref={inputLabel}
                  classes={{ root: classes.label }}
                  htmlFor="gender"
                >
                  Gender
                </InputLabel>
                <Select
                  native
                  value={state.gender}
                  onChange={onChange('gender')}
                  labelWidth={60}
                  fullWidth
                  inputProps={{
                    name: 'gender',
                    id: 'gender',
                    className: classes.input,
                  }}
                >
                  <option key={1} value="" />
                  <option key={2} value="male">Male</option>
                  <option key={3} value="female">Female</option>
                  <option key={4} value="other">Other variant</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  ref={inputLabel}
                  classes={{ root: classes.label }}
                  htmlFor="haveChildren"
                >
                  I have a child
                </InputLabel>
                <Select
                  native
                  value={state.haveChildren}
                  onChange={onChange('haveChildren')}
                  labelWidth={100}
                  fullWidth
                  inputProps={{
                    name: 'haveChildren',
                    id: 'haveChildren',
                    className: classes.input,
                  }}
                >
                  <option key={1} value="" />
                  <option key={2} value="yes">Yes</option>
                  <option key={3} value="no">No</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  ref={inputLabel}
                  classes={{ root: classes.label }}
                  htmlFor="haveCar"
                >
                  I have a car
                </InputLabel>
                <Select
                  native
                  value={state.haveCar}
                  onChange={onChange('haveCar')}
                  labelWidth={90}
                  fullWidth
                  inputProps={{
                    name: 'haveCar',
                    id: 'haveCar',
                    className: classes.input,
                  }}
                >
                  <option key={1} value="" />
                  <option key={2} value="yes">Yes</option>
                  <option key={3} value="no">No</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <FormControl
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  ref={inputLabel}
                  classes={{ root: classes.label }}
                  htmlFor="eBicycle"
                >
                  I have an electric bicycle
                </InputLabel>
                <Select
                  native
                  value={state.eBicycle}
                  onChange={onChange('eBicycle')}
                  labelWidth={190}
                  fullWidth
                  inputProps={{
                    name: 'eBicycle',
                    id: 'eBicycle',
                    className: classes.input,
                  }}
                >
                  <option key={1} value="" />
                  <option key={2} value="yes">Yes</option>
                  <option key={3} value="no">No</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
            >
              <FormControlLabel
                control={(
                  <Checkbox
                    color="default"
                    checked={state.checkedSubscribe}
                    onChange={onChange('checkedSubscribe')}
                    value="checkedSubscribe"
                    inputProps={{
                      'aria-label': 'checkbox with default color',
                    }}
                  />
                )}
                label="Keep me up to date on news and exclusive offers"
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="medium"
            color="primary"
            onClick={showSwalSaveContactInfo}

          >
            Save
          </Button>
          <Button
            size="medium"
            onClick={cancelToEditCustomerInfo}
          >
            Cancel
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </React.Fragment>
  );
};

function putStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

function putActionsToProps(dispatch) {
  return {
    getCustomerInfo: () => dispatch(dispatchGetCustomer()),
    notify: (message, variant = 'default') => dispatch(enqueueSnackbar({
      message,
      options: {
        variant, preventDuplicate: true,
      },
    })),
  };
}

const CustomerInfo = connect(putStateToProps, putActionsToProps)(CustomerInformation);
export { CustomerInfo as Information };

