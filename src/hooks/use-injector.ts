import { useContext } from 'react'
import { InjectorContext } from '../context/injector-context'

export const useInjector = () => useContext(InjectorContext)
