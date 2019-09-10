import React, { createContext, Dispatch, useState } from 'react'
import { GenericContent } from '@sensenet/default-content-types'
import { EditPropertiesDialog } from '../components/edit-dialog'
import CalendarEvent from '../CalendarEvent-type'
import { DialogComponent } from '../components/view-dialog'

export const SharedContext = createContext<{
  openeditmodal: boolean
  setOpeneditmodal: Dispatch<React.SetStateAction<boolean>>
  opendisplaymodal: boolean
  setOpendisplaymodal: Dispatch<React.SetStateAction<boolean>>
  setEvent: Dispatch<React.SetStateAction<GenericContent | undefined>>
  event: CalendarEvent
  refreshcalendar: boolean
  setRefreshcalendar: Dispatch<React.SetStateAction<boolean>>
}>(null as any)

const SharedProvider: React.FunctionComponent<any> = props => {
  const [openeditmodal, setOpeneditmodal] = useState(false)
  const [opendisplaymodal, setOpendisplaymodal] = useState(false)
  const [event, setEvent] = useState<CalendarEvent>(null as any)
  const [refreshcalendar, setRefreshcalendar] = useState(false)

  return (
    <>
      <SharedContext.Provider
        value={{
          openeditmodal,
          setOpeneditmodal,
          setEvent,
          opendisplaymodal,
          setOpendisplaymodal,
          event,
          refreshcalendar,
          setRefreshcalendar,
        }}>
        {props.children}
        {openeditmodal && event != null ? (
          <EditPropertiesDialog
            content={event}
            dialogProps={{
              open: openeditmodal,
              onClose: () => setOpeneditmodal(false),
              keepMounted: false,
            }}
          />
        ) : null}
        {opendisplaymodal && event != null ? (
          <DialogComponent open={opendisplaymodal} content={event} onClose={() => setOpendisplaymodal(false)} />
        ) : null}
      </SharedContext.Provider>
    </>
  )
}
export default SharedProvider
