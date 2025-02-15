// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Generate a dynamic QR code that points to the controller URL.
  // (For this prototype, we assume the controller is accessed via the same URL.)
  generateQRCode("qrContainer", window.location.href);

  // Set up event listeners for control buttons.
  document.getElementById('shakeButton').addEventListener('click', function() {
    // For now, simply display a confirmation message.
    document.getElementById('displayArea').innerText = "Shake action received!";
    // (Future functionality: integrate sensor data and animations.)
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    document.getElementById('displayArea').innerText = "Tilt action received!";
  });

  document.getElementById('logPointsButton').addEventListener('click', function() {
    document.getElementById('displayArea').innerText = "Log Points action received!";
  });
});
