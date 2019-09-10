import { useContext, useState } from 'react'
import { InjectorContext } from '../context/injector-context'
import { SelectionService } from '../services/selection-service'

export const useSelectionService = () => {
  const [selectionService] = useState(useContext(InjectorContext).getInstance(SelectionService))
  return selectionService
}
