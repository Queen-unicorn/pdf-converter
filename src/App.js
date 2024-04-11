import React, { useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import AppForm from "./components/AppForm/AppForm";
import PDFViewer from "pdf-viewer-reactjs";
import { fetchConvertedPdf } from "./services/endpoints";

function App() {
  const [pdfUrl, setPdfUrl] = useState(
    "https://arxiv.org/pdf/quant-ph/0410100.pdf"
  );

  const convertData = (data) => {
    console.log(data);
    //setPdfUrl(fetchConvertedPdf(data));
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-stone-300">
      <header className="text-center flex flex-col items-center justify-start">
        <img src={logo} className="w-24 h-24 mb-4" alt="logo" />
        <h3 className="text-xl font-bold text-zinc-600">
          Paste any text to convert it to PDF
        </h3>
      </header>
      <main className="flex flex-col items-center justify-start w-full">
        <AppForm convertData={convertData} />
        <PDFViewer document={{ url: pdfUrl }} />
      </main>
    </div>
  );
}

export default App;
