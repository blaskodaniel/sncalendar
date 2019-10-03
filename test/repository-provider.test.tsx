import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { RepositoryProvider } from '../src/context/repository-provider'
import { LoginForm } from '../src/components/login-form'

describe('Repository Provider', () => {
  it('Repository Provider snapshot', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = mount(<RepositoryProvider />)
    })

    expect(wrapper).toMatchSnapshot()
  })

  it('onLogin event', async () => {
    let wrapper: any
    await act(async () => {
      wrapper = mount(<RepositoryProvider />)
    })
    await act(async () => {
      ;(wrapper
        .find(LoginForm)
        .first()
        .prop('onLogin') as any)({ username: 'testuser', password: 'testpass', repoUrl: 'http://test.com' } as any)
    })
  })
})
