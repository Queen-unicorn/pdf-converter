import React from "react";

import "../../App.css";
import { dataUrlToBlob, getSortedStorage } from "../../services/utils";

function HistoryTable({ displayPdf }) {
  const sortedLocalStorage = getSortedStorage(localStorage);

  return (
    <div className="h-72 overflow-y-auto whitespace-no-wrap w-1/4">
      <h4 className="text-xl font-bold text-violet-800 p-2">
        Converting History
      </h4>
      {sortedLocalStorage.map(([key, value]) => (
        <div
          key={key}
          onClick={async () => displayPdf(await dataUrlToBlob(value.file))}
        >
          <p className="text-violet-700 font-normal p-2 hover:underline hover:text-stone-700 hover:cursor-pointer">
            {key}.pdf
          </p>
        </div>
      ))}
    </div>
  );
}

export default HistoryTable;
