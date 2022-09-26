import React from 'react'

type Props = { title: string; onClose: () => void; content: any }

const PopUpMenu = ({ title, onClose, content }: Props) => {
  return (
    <>
      <div className="absolute top-10 left-3 z-50 bg-white overflow-hidden border rounded-lg p-5 shadow-lg">
        <span className="font-bold text-lg mb-3">{title}</span>
        <div className="hidden w-80 relative md:block">{content}</div>
        <button
          className="bg-gray-400 text-white px-4 py-1 mt-2 rounded shadow-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div
        className="h-screen w-screen fixed top-0 left-0 z-10 bg-gray-200 opacity-50"
        onClick={onClose}
      ></div>
    </>
  )
}

export default PopUpMenu
