export function blobToDataUrl(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function dataUrlToBlob(base64String) {
  return fetch(base64String).then((resp) => resp.blob());
}

export function getSortedStorage() {
  return Object.entries(localStorage)
    .map(([key, value]) => [key, JSON.parse(value)])
    .sort((a, b) => {
      let dateA = a[1].date;
      let dateB = b[1].date;
      return dateB - dateA;
    });
}

export const getFilename = (text) =>
  `${text.trim().substring(0, 10)}-${new Date()
    .toISOString()
    .replace("T", "-")}`;

export const handleDownloadPdf = (pdfFile) => {
  const link = document.createElement("a");
  link.href = pdfFile;
  link.download = "downloaded_file.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
