import { mount, shallow } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Repository } from '@sensenet/client-core'
import { SharedContext } from '../src/context/shared-context'
import { RepositoryContext } from '../src/context/repository-provider'
import NewDialogBody from '../src/components/new-dialog-body'
import { CalendarTestEvent, MaterialDialogProps } from './mocks/test-objects'

jest.mock('react-quill')

describe('NewDialogBody', () => {
  const content = CalendarTestEvent
  const testprops = {
    parentpath: '/Root/Content',
    dialogProps: MaterialDialogProps,
  }
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

  it('NewDialogBody snapshot test', () => {
    const wrapper = shallow(<NewDialogBody {...(testprops as any)} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Submit test', async () => {
    window.fetch = function fetchMethod() {
      return Promise.resolve({ d: content } as any)
    }
    const repo = new Repository()
    repo.post = function post() {
      return Promise.resolve({ d: content } as any)
    }
    let wrapper: any

    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repo as any}>
          <SharedContext.Provider value={shareobject as any}>
            <NewDialogBody {...(testprops as any)} />
          </SharedContext.Provider>
        </RepositoryContext.Provider>,
      )
    })

    const form = wrapper.update().find('button[type="submit"]')
    console.log(form.html())
    await act(async () => {
      form.simulate('submit')
    })

    expect(shareobject.setRefreshcalendar).toHaveBeenCalledTimes(1)
    expect(shareobject.setRefreshcalendar).toBeCalledWith(!shareobject.refreshcalendar)
  })
})
