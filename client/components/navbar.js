import React from 'react'
import PropTypes from 'prop-types'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton
} from '@material-ui/core'
import {PowerSettingsNew, CalendarToday, Menu} from '@material-ui/icons'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import theme from '../UI-utils/theme'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 160,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - 160px)`,
      marginLeft: 160
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 160,
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
})

const Navbar = ({handleClick, isLoggedIn, classes, window}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <List>
        <ListItem button component={Link} to="/" key="calendar">
          <ListItemIcon>
            <CalendarToday style={{fill: '#fff'}} />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
        <ListItem button onClick={handleClick} key="logout">
          <ListItemIcon>
            <PowerSettingsNew style={{fill: '#fff'}} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <MuiThemeProvider theme={theme}>
      {isLoggedIn && (
        <>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h3"
              noWrap
              gutterBottom
              style={{marginBottom: '30px'}}
            >
              Tiger Lesson Plan
            </Typography>
          </Toolbar>
          <nav className={classes.drawer} aria-label="menu items">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </>
      )}
    </MuiThemeProvider>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
