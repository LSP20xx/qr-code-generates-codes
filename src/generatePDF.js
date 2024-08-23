import jsPDF from "jspdf";
import QRCode from "react-qr-code";
import ReactDOMServer from "react-dom/server";

export const generatePDFWithQR = (qrValue) => {
  const doc = new jsPDF();

  const qrCodeComponent = <QRCode value={qrValue} />;
  const qrCodeHtml = ReactDOMServer.renderToStaticMarkup(qrCodeComponent);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = 256;
  canvas.height = 256;

  const img = new Image();
  img.src = "data:image/svg+xml," + encodeURIComponent(qrCodeHtml);

  img.onload = () => {
    ctx.drawImage(img, 0, 0);

    const imgData = canvas.toDataURL("image/png");
    doc.addImage(imgData, "PNG", 15, 40, 180, 180);

    doc.save("QR_Code.pdf");
  };
};
