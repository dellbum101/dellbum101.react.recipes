import React, { useState } from 'react'

type Options = { title: string; value: string }

type Props = {
  buttonText: string
  filterTitle: string
  options: Options[]
  selectedItems: Set<string>
  setItemsSelected: (item: string, isSelected: boolean) => void
}

const ListSelectionFilter = ({
  buttonText,
  filterTitle,
  options,
  selectedItems,
  setItemsSelected,
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

export default ListSelectionFilter
