import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import "../../App.css";
import { handleDownloadPdf } from "../../services/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PdfViewerComponent({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <button
        className="bg-gradient-to-r from-pink-violet-end to-pink-violet-start w-1/3 text-stone-100 py-2 px-4 rounded-full shadow-md hover:bg-stone-100 hover:text-stone-700"
        onClick={() => handleDownloadPdf(pdfFile)}
      >
        Download PDF
      </button>

      <p>Pages: {numPages}</p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </>
  );
}

export default PdfViewerComponent;
