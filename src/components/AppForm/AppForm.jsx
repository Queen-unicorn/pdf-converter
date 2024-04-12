import React, { useRef, useState } from "react";
import "../../App.css";

function AppForm({ convertData }) {
  const [isTextInvalid, setIsTextInvalid] = useState(false);
  const textareaRef = useRef(null);

  return (
    <form
      className="flex flex-col w-3/4 gap-4 items-center p-10"
      onSubmit={(event) => {
        event.preventDefault();

        if (!textareaRef.current.value.trim()) {
          setIsTextInvalid(true);
          return;
        } else {
          setIsTextInvalid(false);
        }

        convertData(textareaRef.current.value);
        textareaRef.current.value = null;
      }}
    >
      <textarea
        ref={textareaRef}
        className="w-full h-40 p-4 bg-stone-200 text-brown border border-gray rounded-md focus:outline-none"
        placeholder="Enter your text here..."
      ></textarea>

      {isTextInvalid && (
        <p className="text-red-600 font-medium">Enter some text!</p>
      )}

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
