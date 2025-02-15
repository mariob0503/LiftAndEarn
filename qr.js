// qr.js
function generateQRCode(containerId, url) {
  const container = document.getElementById(containerId);
  // Clear any existing content in the container.
  container.innerHTML = "";
  // Create the QR code.
  new QRCode(container, {
    text: url,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}
