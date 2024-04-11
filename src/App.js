import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";

import logo from "./logo.svg";
import "./App.css";

import HistoryTable from "./components/HistoryTable/HistoryTable";
import AppForm from "./components/AppForm/AppForm";

import { fetchConvertedPdf } from "./services/endpoints";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const [pdfFile, setPdfFile] = useState();

  const convertData = (text) => {
    fetchConvertedPdf(text)
      .then((pdfBlob) => {
        const url = URL.createObjectURL(pdfBlob);
        setPdfFile(url);
      })
      .catch((error) => {
        console.error("Error converting data to PDF: ", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-stone-300">
      <header className="text-center flex flex-col items-center justify-start">
        <img src={logo} className="w-24 h-24 mb-4" alt="logo" />
        <h1 className="text-4xl leading-snug font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-violet-start to-pink-violet-end">
          Paste any text to convert it to PDF
        </h1>
      </header>
      <main className="flex flex-row items-start justify-start w-full">
        <div className="flex flex-col items-center justify-start w-full">
          <AppForm convertData={convertData} />
          {pdfFile && (
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>
          )}
        </div>
        <HistoryTable />
      </main>
    </div>
  );
}

export default App;
