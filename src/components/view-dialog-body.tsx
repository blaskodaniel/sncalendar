import React, { useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import moment from 'moment'
import striptags from 'striptags'
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room'
import WatchIcon from '@material-ui/icons/Watch'
import NotesIcon from '@material-ui/icons/Notes'
import EditOutlined from '@material-ui/icons/EditOutlined'
import CalendarEvent from '../CalendarEvent-type'
import { SharedContext } from '../context/shared-context'

export interface EditDialogBodyDialogProps {
  content: CalendarEvent
  dialogClose: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listitemroot: {
      width: '100%',
      maxWidth: 450,
      padding: 0,
      backgroundColor: theme.palette.background.paper,
    },
    ml15: {
      marginLeft: '15px',
    },
    card: {
      boxShadow: 'none',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#4d8ead',
    },
    icon: {
      fontSize: '2rem',
    },
    button: {
      padding: '4px',
    },
  }),
)

export const ViewDialogBody: React.FunctionComponent<EditDialogBodyDialogProps> = props => {
  const classes = useStyles()
  const sharedcontext = useContext(SharedContext)

  const dateTimeDisplay = (event: CalendarEvent) => {
    if (event.AllDay) {
      return 'All day'
    }
    if (moment(event.StartDate).isSame(event.EndDate, 'day')) {
      return `${moment(event.StartDate).format('dddd, MMM-DD HH:mm')} - ${moment(event.EndDate).format('HH:mm')}`
    } else {
      return `${moment(event.StartDate).format('dddd, MMM-DD HH:mm')} - ${moment(event.EndDate).format(
        'dddd, MMM-DD HH:mm',
      )}`
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="row" justify="flex-end">
          <Grid item>
            <IconButton
              aria-label="edit"
              className={classes.button}
              onClick={() => {
                sharedcontext.setEvent(props.content)
                sharedcontext.setOpeneditmodal(true)
              }}>
              <EditOutlined className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container direction="column" justify="center">
          <Grid item>
            <Typography variant="h5" component="h2" className={classes.ml15}>
              {props.content.DisplayName}
            </Typography>
          </Grid>
          <Grid item>
            <List className={classes.listitemroot}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WatchIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Date" secondary={dateTimeDisplay(props.content)} />
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <List className={classes.listitemroot}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <RoomIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Location" secondary={props.content.Location} />
              </ListItem>
            </List>
          </Grid>
          <Grid item>
            <List className={classes.listitemroot}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NotesIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Description"
                  secondary={props.content.Description != undefined ? striptags(props.content.Description) : ''}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
