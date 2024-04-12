import React, { useState } from "react";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import logo from "./logo.svg";
import "./App.css";

import HistoryTable from "./components/HistoryTable/HistoryTable";
import AppForm from "./components/AppForm/AppForm";
import PdfViewerComponent from "./components/PdfViewerComponent/PdfViewerComponent";

import { fetchConvertedPdf } from "./services/endpoints";
import { blobToDataUrl, getFilename } from "./services/utils";

function App() {
  const [pdfFile, setPdfFile] = useState();

  const displayPdfInViewer = (pdfBlob) => {
    const url = URL.createObjectURL(pdfBlob);
    setPdfFile(url);
  };

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

        displayPdfInViewer(pdfBlob);
      })
      .catch((error) => {
        console.error("Error while converting data to PDF: ", error);
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
      <main className="flex flex-col items-center justify-start w-full gap-5">
        <div className="flex flex-row items-center w-full p-5">
          <AppForm convertData={textToPdf} />
          <HistoryTable displayPdf={displayPdfInViewer} />
        </div>
        {pdfFile && <PdfViewerComponent pdfFile={pdfFile} />}
      </main>
    </div>
  );
}

export default App;
