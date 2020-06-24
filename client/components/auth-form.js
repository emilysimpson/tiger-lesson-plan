import React from 'react'
import {
  Grid,
  Button,
  Typography,
  Container,
  TextField,
  Paper
} from '@material-ui/core'
import {Pets} from '@material-ui/icons'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginTop: '10vh',
        overflow: 'hidden'
      }}
    >
      <Grid container>
        <Grid
          item
          sm={10}
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Paper style={{postion: 'fixed', padding: '15px', maxWidth: '500px'}}>
            <form onSubmit={handleSubmit} name={name}>
              <Grid container spacing={4} style={{textAlign: 'center'}}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Hi, Tiger! <Pets fontSize="large" />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Please Login.</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField variant="outlined" label="Email" name="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    type="password"
                    label="Password"
                    name="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    {displayName}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {error &&
                    error.response && (
                      <Typography color="error">
                        {error.response.data}
                      </Typography>
                    )}
                </Grid>
              </Grid>
            </form>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
            >
              <img width="25%" src="Cute-tiger.png" />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
