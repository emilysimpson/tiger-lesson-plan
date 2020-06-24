import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(249, 229, 202, 1)'
      // default: 'rgba(254, 210, 136, 1)',
    },
    primary: {
      light: 'rgba(249, 229, 202, 1)',
      main: 'rgba(245, 166, 35, 1)',
      dark: 'rgba(169, 106, 4, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(155, 155, 155, 1)',
      main: 'rgba(74, 74, 74, 1)',
      dark: 'rgba(0, 0, 0, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  overrides: {
    MUIRichTextEditor: {
      root: {
        width: '400px',
        backgroundColor: '#ebebeb'
      },
      editor: {
        backgroundColor: '#fff',
        padding: '20px',
        height: '200px',
        maxHeight: '200px',
        overflow: 'auto'
      },
      toolbar: {
        backgroundColor: 'rgba(155, 155, 155, 1)',
        color: '#fff'
      }
    }
  }
})

export default theme
