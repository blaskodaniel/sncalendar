import { mount, shallow } from 'enzyme'
import React from 'react'
import { Repository } from '@sensenet/client-core'
import { act } from 'react-dom/test-utils'
import EditPropertiesDialogBody from '../src/components/edit-dialog-body'
import { SharedContext } from '../src/context/shared-context'
import { RepositoryContext } from '../src/context/repository-provider'
import { MaterialDialogProps, mockContent } from './mocks/test-objects'

jest.mock('react-quill')

describe('EditPropertiesDialogBody', () => {
  const testprops = {
    contentId: 135121,
    dialogProps: MaterialDialogProps,
  }
  const content = mockContent
  const shareobject = {
    openeditmodal: true,
    setOpeneditmodal: jest.fn(),
    setEvent: jest.fn(),
    opendisplaymodal: false,
    setOpendisplaymodal: jest.fn(),
    event: content,
    refreshcalendar: true,
    setRefreshcalendar: jest.fn(),
    opennewmodal: true,
    setOpennewmodal: jest.fn(),
    setOpennoti: jest.fn(),
  }

  it('EditPropertiesDialogBody snapshot', () => {
    const l = shallow(<EditPropertiesDialogBody {...(testprops as any)} />)
    expect(l).toMatchSnapshot()
  })

  it('call onSubmit', async () => {
    const repo = new Repository()
    repo.load = function load() {
      return Promise.resolve({ d: content } as any)
    }
    repo.patch = function patch() {
      return Promise.resolve({ d: { ...content, Path: '/Root/Path/A' } } as any)
    }
    let wrapper: any

    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repo as any}>
          <SharedContext.Provider value={shareobject}>
            <EditPropertiesDialogBody {...(testprops as any)} />
          </SharedContext.Provider>
        </RepositoryContext.Provider>,
      )
    })

    const form = wrapper.update().find('form')
    await act(async () => {
      form.simulate('submit')
    })

    expect(shareobject.setEvent).toBeCalledWith({ ...content, Path: '/Root/Path/A' })
    expect(shareobject.setRefreshcalendar).toBeCalledWith(!shareobject.refreshcalendar)
  })
})
