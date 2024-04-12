import React from "react";

import { render, fireEvent } from "@testing-library/react";
import PdfViewerComponent from "./PdfViewerComponent";
import { handleDownloadPdf } from "../../services/utils";

jest.mock("../../services/utils", () => ({
  handleDownloadPdf: jest.fn(),
}));

describe("PdfViewerComponent", () => {
  const mockPdfFile = "mock-pdf-file.pdf";

  test("Renders Download PDF button", () => {
    const { getByText } = render(<PdfViewerComponent pdfFile={mockPdfFile} />);
    const downloadButton = getByText("Download PDF");

    expect(downloadButton).toBeInTheDocument();
  });

  test("Calls handleDownloadPdf function when download button is clicked", () => {
    const { getByText } = render(<PdfViewerComponent pdfFile={mockPdfFile} />);
    const downloadButton = getByText("Download PDF");

    fireEvent.click(downloadButton);

    expect(handleDownloadPdf).toHaveBeenCalledWith(mockPdfFile);
  });

  test("Renders correct number of pages", async () => {
    const { getByText } = render(<PdfViewerComponent pdfFile={mockPdfFile} />);

    await fireEvent(getByText("Pages:"), new Event("loadSuccess"));

    expect(getByText("Pages:")).toBeInTheDocument();
  });
});
