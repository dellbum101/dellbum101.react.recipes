import { SetStateAction } from 'react'

export const toggleSelectedItemInList = (
  item: string,
  isSelected: boolean,
  setSelectedItem: (value: SetStateAction<Set<string>>) => void
) => {
  setSelectedItem((selectedItems) => {
    if (isSelected) {
      selectedItems.add(item)
    } else {
      selectedItems.delete(item)
    }
    return new Set(selectedItems.values())
  })
}
