import React from 'react'
import axios from 'axios'
import {
  Input,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Container,
  FormControl,
  Grid,
  Button,
  LinearProgress,
  Typography
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte'
import {stateToHTML} from 'draft-js-export-html'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {newActivity} from '../store/activities'
import theme from '../UI-utils/theme'

const styles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch'
    }
  }
})

class AddActivity extends React.Component {
  constructor() {
    super()
    this.state = {
      activityType: null,
      title: '',
      url: '',
      imageRef: null,
      content: '',
      weekday: '',
      file: null,
      loading: false
    }
  }

  componentDidMount() {
    const {weekday} = this.props.match.params
    this.setState({weekday: weekday})
  }

  submitFile = async event => {
    console.log(event.target.files)
    await this.setState({file: event.target.files})
    try {
      event.preventDefault()
      this.setState({loading: true})
      const formData = new FormData()
      formData.append('file', this.state.file[0])
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.setState({imageRef: res.data})
      this.setState({loading: false})
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleRTEChange = data => {
    this.setState({
      content: stateToHTML(data.getCurrentContent()).replace('<p><br></p>', '')
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const activity = {
      activityType: this.state.activityType,
      title: this.state.title,
      url: this.state.url,
      imageRef: this.state.imageRef,
      content: this.state.content,
      weekday: this.state.weekday
    }
    this.props.newActivity(activity)
  }

  render() {
    const {weekday} = this.props.match.params
    const classes = this.props.classes
    return (
      <Container className={classes.root} style={{margin: '5px'}}>
        <Typography variant="h6">Add activity</Typography>
        {!this.state.activityType ? (
          <Grid item xs={12}>
            <FormControl style={{minWidth: '220px'}}>
              <InputLabel htmlFor="activityType">Activity type</InputLabel>
              <Select
                name="activityType"
                id="activityType"
                onChange={this.handleChange}
              >
                <MenuItem>Select one</MenuItem>
                <MenuItem value="activity">Project</MenuItem>
                <MenuItem value="video">Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <>
            {this.state.loading ? (
              <LinearProgress color="secondary" style={{width: '50ch'}} />
            ) : this.state.imageRef ? (
              <img
                src={`https://lesson-plan-uploads.s3.amazonaws.com/${
                  this.state.imageRef
                }`}
                width="200px"
              />
            ) : (
              <>
                {this.state.activityType === 'activity' && (
                  <>
                    <input
                      style={{display: 'none'}}
                      id="text-button-file"
                      accept="image/*"
                      label="upload"
                      type="file"
                      onChange={this.submitFile}
                    />
                    <label htmlFor="text-button-file">
                      <Button component="span">Upload Image</Button>
                    </label>
                  </>
                )}
              </>
            )}
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="standard-required"
                    helperText="Required"
                    label="Title"
                    name="title"
                    onChange={this.handleChange}
                  />
                </Grid>
                {this.state.activityType === 'video' && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      helperText="Required"
                      label="URL"
                      type="text"
                      name="url"
                      onChange={this.handleChange}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <MUIRichTextEditor
                    label="Content"
                    name="content"
                    onChange={this.handleRTEChange}
                    style={{height: '500px'}}
                    controls={[
                      'bold',
                      'italic',
                      'underline',
                      'quote',
                      'clear',
                      'numberList',
                      'bulletList'
                    ]}
                  />
                </Grid>
                <Grid item xs={12} style={{paddingLeft: '30px'}}>
                  <FormControl style={{minWidth: '220px'}}>
                    <InputLabel htmlFor="weekday">Weekday</InputLabel>
                    <Select
                      name="weekday"
                      defaultValue={weekday}
                      onChange={this.handleChange}
                    >
                      <MenuItem value="monday">Monday</MenuItem>
                      <MenuItem value="tuesday">Tuesday</MenuItem>
                      <MenuItem value="wednesday">Wednesday</MenuItem>
                      <MenuItem value="thursday">Thursday</MenuItem>
                      <MenuItem value="friday">Friday</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{paddingLeft: '30px'}}>
                  {!this.state.title.length || this.state.loading ? (
                    <Button variant="contained" disabled>
                      Submit
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Container>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    newActivity: activity => dispatch(newActivity(activity))
  }
}

export default withStyles(styles)(connect(null, mapDispatch)(AddActivity))
