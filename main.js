// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Determine if this instance is a Controller based on a query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const isController = urlParams.has('controller'); // e.g., URL: .../LiftandEarn/?controller

  // Create a BroadcastChannel for communication between Display and Controller.
  const bc = new BroadcastChannel('liftandearn_channel');
  bc.onmessage = function(event) {
    if (!isController && event.data === 'control-taken') {
      // On Display: hide the QR code when control is taken.
      const qrContainer = document.getElementById('qrContainer');
      if (qrContainer) {
        qrContainer.style.display = 'none';
      }
      // Optionally, update the display area.
      document.getElementById('displayArea').innerText = "Control taken by Controller.";
    }
  };

  // On Display, generate the QR code.
  if (!isController) {
    // Generate a QR code that points to the Controller version (i.e. add ?controller to the URL)
    generateQRCode("qrContainer", window.location.href + "?controller");
  } else {
    // On Controller, hide the QR container.
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer) {
      qrContainer.style.display = 'none';
    }
  }

  // Button event listeners.
  // When a button is pressed on the Controller, broadcast a "control-taken" message.
  document.getElementById('shakeButton').addEventListener('click', function() {
    if (isController) {
      bc.postMessage('control-taken');
      document.getElementById('displayArea').innerText = "Shake action received on Controller!";
    } else {
      document.getElementById('displayArea').innerText = "Shake action received on Display!";
    }
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    if (isController) {
      bc.postMessage('control-taken');
      document.getElementById('displayArea').innerText = "Tilt action received on Controller!";
    } else {
      document.getElementById('displayArea').innerText = "Tilt action received on Display!";
    }
  });

  document.getElementById('logPointsButton').addEventListener('click', function() {
    if (isController) {
      bc.postMessage('control-taken');
      document.getElementById('displayArea').innerText = "Log Points action received on Controller!";
    } else {
      document.getElementById('displayArea').innerText = "Log Points action received on Display!";
    }
  });
});
