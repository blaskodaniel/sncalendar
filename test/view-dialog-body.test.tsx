import { mount, shallow } from 'enzyme'
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { act } from 'react-dom/test-utils'
import { Repository } from '@sensenet/client-core'
import { Button } from '@material-ui/core'
import { RepositoryContext } from '../src/context/repository-provider'
import { SharedContext } from '../src/context/shared-context'
import { ViewDialogBody } from '../src/components/view-dialog-body'
import { CalendarTestEvent, CalendarTestEventAllDay } from './mocks/test-objects'

jest.mock('react-quill')

describe('ViewDialogBody', () => {
  const content = CalendarTestEvent
  const contentAllDay = CalendarTestEventAllDay
  const testprops = {
    content,
    dialogClose: true,
  }
  const testpropsAllday = {
    content: contentAllDay,
    dialogClose: true,
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
  const shareobjectAllDay = {
    openeditmodal: true,
    setOpeneditmodal: jest.fn(),
    setEvent: jest.fn(),
    opendisplaymodal: false,
    setOpendisplaymodal: jest.fn(),
    event: contentAllDay,
    refreshcalendar: true,
    setRefreshcalendar: jest.fn(),
    opennewmodal: true,
    setOpennewmodal: jest.fn(),
    setOpennoti: jest.fn(),
  }

  it('ViewDialogBody snapshot test', () => {
    const wrapper = shallow(<ViewDialogBody {...(testprops as any)} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Open dialog and remove event test', async () => {
    const repo = new Repository()
    repo.load = function load() {
      return Promise.resolve({ d: content } as any)
    }
    repo.delete = jest.fn()
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repo as any}>
          <SharedContext.Provider value={shareobject as any}>
            <ViewDialogBody {...(testprops as any)} />
          </SharedContext.Provider>
        </RepositoryContext.Provider>,
      )
    })
    wrapper
      .update()
      .find(IconButton)
      .first()
      .simulate('click')
    expect(wrapper.find('div#simple-dialog-title').text()).toEqual('Are you sure you want to delete it?')

    await act(async () => {
      wrapper
        .find(Button)
        .first()
        .simulate('click')
    })

    expect(shareobject.setRefreshcalendar).toBeCalledWith(!shareobject.refreshcalendar)
    expect(shareobject.setOpendisplaymodal).toBeCalledWith(false)
    expect(shareobject.setOpennoti).toBeCalledWith(true)
  })

  it('All Day event test', async () => {
    const repo = new Repository()
    repo.load = function load() {
      return Promise.resolve({ d: content } as any)
    }
    let wrapper: any
    await act(async () => {
      wrapper = mount(
        <RepositoryContext.Provider value={repo as any}>
          <SharedContext.Provider value={shareobjectAllDay as any}>
            <ViewDialogBody {...(testpropsAllday as any)} />
          </SharedContext.Provider>
        </RepositoryContext.Provider>,
      )
    })

    expect(wrapper.find('div.MuiCardContent-root').text()).toContain('All day')
  })
})
