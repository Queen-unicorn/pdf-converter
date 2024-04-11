import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import logo from "./logo.svg";
import "./App.css";

import HistoryTable from "./components/HistoryTable/HistoryTable";
import AppForm from "./components/AppForm/AppForm";

import { fetchConvertedPdf } from "./services/endpoints";
import { blobToDataUrl } from "./services/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const [pdfFile, setPdfFile] = useState();

  const displayPdf = (pdfBlob) => {
    const url = URL.createObjectURL(pdfBlob);
    setPdfFile(url);
  };

  const getFilename = (text) =>
    `${text.trim().substring(0, 10)}-${new Date()
      .toISOString()
      .replace("T", "-")}`;

  const textToPdf = (text) => {
    fetchConvertedPdf(text)
      .then(async (pdfBlob) => {
        const filename = getFilename(text);

        localStorage.setItem(
          filename,
          JSON.stringify({
            file: await blobToDataUrl(pdfBlob),
            date: Date.now(),
          })
        );

        displayPdf(pdfBlob);
      })
      .catch((error) => {
        console.error("Error converting data to PDF: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start bg-stone-300 min-h-screen">
      <header className="text-center flex flex-col items-center justify-start">
        <img src={logo} className="w-24 h-24 mb-4" alt="logo" />
        <h1 className="text-4xl leading-snug font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-violet-start to-pink-violet-end">
          Paste your text to convert it to PDF
        </h1>
      </header>
      <main className="flex flex-row items-start justify-start w-full">
        <div className="flex flex-col items-center justify-start w-3/4">
          <AppForm convertData={textToPdf} />
          {pdfFile && (
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>
          )}
        </div>
        <HistoryTable displayPdf={displayPdf} />
      </main>
    </div>
  );
}

export default App;
