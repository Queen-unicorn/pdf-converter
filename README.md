It's a PDF Converter project by Iryna Kovalenko

On this website you can convert any text to the .pdf, download it and see history of converting.

You can run this sproject locally using:

### `npm start`

In App.js there is a main structure of the project.

Project components:

- AppForm: component that contains form with textarea and "Convert to PDF" button.
  Additionally it has textarea validation and Error displaying when user wants to convert an empty string.
  For this component there is a test file.
- PdfViewerComponent: component that does the main work for converting text to .pdf format.
  First of all, we can find there a worker setup, also we have document loading and pages number calculation logic here.
  For this component there is a test file.
- HistoryTable: component that renders a Converting history table. It contains all the text we converted before. It stores files with filename like "(First 10 symbols)-(Date and time of creating).pdf" sorted by date of creating.
  Data stores in localStorage.

Also for better understending of logic there is a services folder that contains:

- endpoints: file with fetching API call. There is also an API_KEY
- utils: file with functions to work with data - converting PDF file to Blob and back, sorting history, downloading file to the PC etc.
