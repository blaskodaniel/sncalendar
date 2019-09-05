import React from 'react'
import { DialogContent, DialogTitle } from '@material-ui/core'
import { EditView } from '@sensenet/controls-react'
import { DialogProps } from '@material-ui/core/Dialog'
import { ConstantContent } from '@sensenet/client-core'
import { useRepository } from '../hooks/use-repository'
import { useSelectionService } from '../hooks/use-selection-service'
import { CurrentContentContext, CurrentContentProvider } from '../context/current-context'
import CalendarEvent from '../CalendarEvent-type'

const EditPropertiesDialogBody: React.FunctionComponent<{
  contentId: number
  dialogProps: DialogProps
}> = props => {
  const selectionService = useSelectionService()
  const repo = useRepository()

  const onSubmit = async (id: number, content: CalendarEvent) => {
    try {
      await repo.patch({
        idOrPath: id,
        content,
      })
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
                  content={content}
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
