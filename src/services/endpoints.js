const API_KEY = "78684310-850d-427a-8432-4a6487f6dbc4";

export const fetchConvertedPdf = async (text) => {
  const url = `http://95.217.134.12:4010/create-pdf?apiKey=${API_KEY}`;
  const requestBody = {
    text,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const pdfBlob = await response.blob();
    return pdfBlob;
  } catch (error) {
    console.error("Error: ", error);
  }
};
