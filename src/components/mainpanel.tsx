import React, { useEffect, useState } from 'react'
import { ODataCollectionResponse } from '@sensenet/client-core'
import moment from 'moment'
import sortby from 'lodash.sortby'
import { createStyles, makeStyles } from '@material-ui/styles'
import { List, ListItem, ListItemAvatar } from '@material-ui/core'
import { v1 } from 'uuid'
import { Query } from '@sensenet/query'
import CalendarEvent from '../CalendarEvent-type'
import { useRepository } from '../hooks/use-repository'
import EventComponent from './event'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    dayAvatar: {
      alignSelf: 'flex-start',
      paddingTop: '8px',
    },
    dayname: {
      display: 'block',
      textAlign: 'center',
    },
    daynumber: {
      display: 'block',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 400,
    },
    nopadding: {
      padding: '0',
    },
  }),
)

export interface GroupdByAny {
  date: any
  event: CalendarEvent[]
  id: string
}

/**
 * Main component
 */
const MainPanel: React.FunctionComponent = () => {
  const classes = useStyles()
  const repo = useRepository()
  const [data, setData] = useState<GroupdByAny[]>([])

  const groupByDay = function(xs: CalendarEvent[], key: keyof Pick<CalendarEvent, 'StartDate'>) {
    const resultArray: GroupdByAny[] = []
    xs.forEach(event => {
      const findevent = resultArray.find(
        c =>
          moment(new Date(c.date)).format('YYYY-MM-DD') ===
          moment(new Date(event[key] !== undefined ? (event[key] as string) : '')).format('YYYY-MM-DD'),
      )
      if (findevent) {
        findevent.event.push(event)
        const valami = sortby(findevent.event, 'AllDay', ['asc'])
        console.log('sort: ', valami)
      } else {
        if (event[key]) {
          resultArray.push({
            id: v1(),
            date: event[key],
            event: [event],
          })
        }
      }
    })
    return resultArray
  }

  useEffect(() => {
    const loadCalendar = async () => {
      const result: ODataCollectionResponse<CalendarEvent> = await repo.loadCollection({
        path: `/Root/Content/IT/Calendar`,
        oDataOptions: {
          select: [
            'DisplayName',
            'Description',
            'CreationDate',
            'CreatedBy',
            'ModifiedBy',
            'ModificationDate',
            'Icon',
            'Type',
            'Id',
            'Path',
            'Name',
            'Size',
            'Location',
            'StartDate',
            'EndDate',
            'Lead',
            'AllDay',
            'EventUrl',
            'OwnerEmail',
          ] as any,
          query: new Query(q =>
            q.greatherThan('StartDate', '2019-01-01').and.lessThan('StartDate', '2019.12.31'),
          ).toString(),
          orderby: [['StartDate', 'asc']],
          expand: ['CreatedBy', 'ModifiedBy'],
        },
      })

      const groupedby = groupByDay(result.d.results, 'StartDate')
      console.log(groupedby)
      setData(groupedby)
    }

    // Load calendar datas from Repository
    loadCalendar()
  }, [repo])

  return (
    <>
      {data.map(element => {
        return (
          <List key={element.id} className={classes.root}>
            <ListItem className={classes.nopadding}>
              <ListItemAvatar className={classes.dayAvatar}>
                <div>
                  <span className={classes.dayname}>{moment(new Date(element.date)).format('ddd')}</span>
                  <span className={classes.daynumber}>{moment(new Date(element.date)).format('D')}</span>
                </div>
              </ListItemAvatar>
              <EventComponent event={element.event} />
            </ListItem>
          </List>
        )
      })}
    </>
  )
}

export default MainPanel
