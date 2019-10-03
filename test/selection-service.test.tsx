import { Injector } from '@furystack/inject'
import { ConsoleLogger } from '@furystack/logging'
import { SelectionService } from '../src/services/selection-service'

describe('SelectionService', () => {
  it('SelectionService snapshot', () => {
    const injector = new Injector()
    injector.options.owner = 'SnApp'
    injector.useLogging(ConsoleLogger)
    const l = new SelectionService(injector)
    expect(l).toMatchSnapshot()
  })
})
