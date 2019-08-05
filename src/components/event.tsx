import React from 'react'
import moment from 'moment'
import { Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core'
import { User } from '@sensenet/default-content-types'
import CalendarEvent from '../CalendarEvent-type'
import defavatar from '../assets/avatar-default.png'

const useStyles = makeStyles(() =>
  createStyles({
    parentlistelement: {
      display: 'flex',
      flexDirection: 'row-reverse',
      minWidth: '350px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: '2%',
      marginBottom: '7px',
    },
    alldayevent: {
      backgroundColor: '#d3daff',
    },
    simpleevent: {
      backgroundColor: 'azure',
    },
  }),
)

export interface EventComponentProps {
  event: CalendarEvent[]
}

const EventComponent: React.FunctionComponent<EventComponentProps> = props => {
  const classes = useStyles()
  const timeAndLocationpart = (event: CalendarEvent) => {
    const start = moment(new Date(event.StartDate as string)).format('HH:mm')
    const end = moment(new Date(event.EndDate as string)).format('HH:mm')
    const isAllday = event.AllDay
    const location = event.Location
    const timeDisplay = isAllday ? 'all day' : ` ${start}-${end}`
    return `${timeDisplay} at ${location}`
  }

  return (
    <List>
      {props.event.map(event => {
        return (
          <ListItem
            key={event.Id}
            className={`${classes.parentlistelement} ${event.AllDay ? classes.alldayevent : classes.simpleevent}`}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={(event.CreatedBy as User).Avatar!.Url === '' ? defavatar : (event.CreatedBy as User).Avatar!.Url}
              />
            </ListItemAvatar>
            <ListItemText primary={event.DisplayName} secondary={timeAndLocationpart(event)} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default EventComponent
