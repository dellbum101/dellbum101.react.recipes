import { Search } from '@mui/icons-material'
import React, { useState } from 'react'

type Options = { title: string; value: string }

type Props = {
  buttonText: string
  filterTitle: string
  options: Options[]
  selectedItems: Set<string>
  setItemsSelected: (item: string, isSelected: boolean) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const ListSelectionFilterWithSearch = ({
  buttonText,
  filterTitle,
  options,
  selectedItems,
  setItemsSelected,
  searchTerm,
  setSearchTerm,
}: Props) => {
  const [showFilter, setShowFilter] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        className="bg-blue-400 text-white px-4 py-1 rounded-full mx-1 shadow-md"
        onClick={() => setShowFilter(!showFilter)}
      >
        {buttonText} ({selectedItems.size})
      </button>
      {showFilter && (
        <>
          <div className="absolute top-10 left-3 z-50 bg-white overflow-hidden border rounded-lg p-5 shadow-lg">
            <span className="font-bold text-lg mb-3">{filterTitle}</span>
            <div className="w-80 relative md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <Search />
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Ingredients..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="hidden w-80 relative md:block">
              {options.sort().map((item) => {
                return (
                  <div key={item.value}>
                    <input
                      id={item.value}
                      type="checkbox"
                      value={item.value}
                      onChange={(event) =>
                        setItemsSelected(item.value, event.target.checked)
                      }
                      checked={selectedItems.has(item.value)}
                    />
                    <label htmlFor={item.value} className="ml-3">
                      {item.title}
                    </label>
                  </div>
                )
              })}
            </div>
            <button
              className="bg-gray-400 text-white px-4 py-1 mt-2 rounded shadow-md"
              onClick={() => setShowFilter(false)}
            >
              Close
            </button>
          </div>
          <div
            className="h-screen w-screen fixed top-0 left-0 z-20 bg-gray-200 opacity-50"
            onClick={() => setShowFilter(false)}
          ></div>
        </>
      )}
    </div>
  )
}

export default ListSelectionFilterWithSearch
