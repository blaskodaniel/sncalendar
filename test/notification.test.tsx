import { shallow } from 'enzyme'
import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CalendarNotification from '../src/components/notification'

describe('CalendarNotification', () => {
  const variantIcon = {
    success: CheckCircleIcon,
  }
  const testprops = {
    className: '',
    message: 'Test message',
    onClose: jest.fn(),
    variant: variantIcon.success,
  }

  it('CalendarNotification snapshot', () => {
    const wrapper = shallow(<CalendarNotification {...(testprops as any)} />)
    expect(wrapper).toMatchSnapshot()
  })
})
