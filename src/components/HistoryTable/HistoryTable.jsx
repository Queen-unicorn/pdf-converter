import React from "react";

import "../../App.css";
import { dataUrlToBlob, getSortedStorage } from "../../services/utils";

function HistoryTable({ displayPdf }) {
  const sortedLocalStorage = getSortedStorage(localStorage);

  return (
    <div>
      <h4 className="text-xl font-bold text-violet-700 p-2">History</h4>
      {sortedLocalStorage.map(([key, value]) => (
        <div
          key={key}
          onClick={async () => displayPdf(await dataUrlToBlob(value.file))}
        >
          <p className="text-violet-500 font-normal p-2 hover:underline hover:text-stone-600 hover:cursor-pointer">
            {key}.pdf
          </p>
        </div>
      ))}
    </div>
  );
}

export default HistoryTable;
