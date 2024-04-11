import React, { useRef } from "react";
import "../../App.css";

function AppForm({ convertData }) {
  const textareaRef = useRef(null);

  return (
    <form
      className="flex flex-col w-full gap-4 items-center p-10"
      onSubmit={(event) => {
        event.preventDefault();
        convertData(textareaRef.current.value);
      }}
    >
      <textarea
        ref={textareaRef}
        className="w-full h-40 p-4 bg-stone-200 text-brown border border-gray rounded-md focus:outline-none"
        placeholder="Enter your text here..."
      ></textarea>
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-violet-start to-pink-violet-end w-1/3 text-stone-100 py-2 px-4 rounded-full shadow-md hover:bg-stone-100 hover:text-stone-700"
      >
        Convert to PDF
      </button>
    </form>
  );
}

export default AppForm;
