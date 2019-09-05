import React, { useContext } from 'react'
import { DialogContent, DialogTitle } from '@material-ui/core'
import { EditView } from '@sensenet/controls-react'
import { DialogProps } from '@material-ui/core/Dialog'
import { ConstantContent } from '@sensenet/client-core'
import { ContentType } from '@sensenet/default-content-types'
import { useRepository } from '../hooks/use-repository'
import { useSelectionService } from '../hooks/use-selection-service'
import { CurrentContentContext, CurrentContentProvider } from '../context/current-context'
import CalendarEvent from '../CalendarEvent-type'
import { SharedContext } from '../context/shared-context'

const EditPropertiesDialogBody: React.FunctionComponent<{
  contentId: number
  dialogProps: DialogProps
}> = props => {
  const selectionService = useSelectionService()
  const repo = useRepository()
  const sharedcontext = useContext(SharedContext)

  const onSubmit = async (id: number, content: CalendarEvent) => {
    try {
      const response = await repo.patch({
        idOrPath: id,
        content,
        oDataOptions: {
          select: 'all' as any,
        },
      })
      sharedcontext.setEvent(response.d) // Refresh the view dialog window
      sharedcontext.setRefreshcalendar(!sharedcontext.refreshcalendar) // Refresh the main calendar list
      props.dialogProps.onClose && props.dialogProps.onClose(null as any, 'backdropClick')
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <CurrentContentProvider
      idOrPath={props.contentId}
      onContentLoaded={(c: CalendarEvent) => selectionService.activeContent.setValue(c)}
      oDataOptions={{ select: 'all' }}>
      <CurrentContentContext.Consumer>
        {(content: CalendarEvent) =>
          content.Id !== ConstantContent.PORTAL_ROOT.Id && (
            <>
              <DialogTitle>Edit</DialogTitle>
              <DialogContent>
                <EditView
                  content={content as ContentType}
                  repository={repo}
                  handleCancel={() =>
                    props.dialogProps.onClose && props.dialogProps.onClose(null as any, 'backdropClick')
                  }
                  onSubmit={onSubmit}
                />
              </DialogContent>
            </>
          )
        }
      </CurrentContentContext.Consumer>
    </CurrentContentProvider>
  )
}

export default EditPropertiesDialogBody
