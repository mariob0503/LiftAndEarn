// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Determine if this instance is a Controller based on a query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const isController = urlParams.has('controller'); // e.g., URL: .../LiftandEarn/?controller
  console.log("Is Controller:", isController);

  // Set up a BroadcastChannel for communication between Display and Controller.
  const bc = new BroadcastChannel('liftandearn_channel');
  bc.onmessage = function(event) {
    console.log("BroadcastChannel message received:", event.data);
    if (!isController && event.data === 'control-taken') {
      console.log("Received 'control-taken' on Display");
      // On the Display, hide the QR code and update the display area.
      const qrContainer = document.getElementById('qrContainer');
      if (qrContainer) {
        qrContainer.style.display = 'none';
      }
      document.getElementById('displayArea').innerText = "Control taken by Controller.";
    }
  };

  // On the Display, generate the QR code.
  if (!isController) {
    // Generate a QR code that points to the Controller version (append "?controller" to the URL)
    generateQRCode("qrContainer", window.location.href + "?controller");
  } else {
    // On the Controller, hide the QR code container.
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer) {
      qrContainer.style.display = 'none';
    }
  }

  // Button event listeners.
  document.getElementById('shakeButton').addEventListener('click', function() {
    if (isController) {
      console.log("Shake button pressed on Controller");
      bc.postMessage('control-taken');
      console.log("Broadcast message sent from Controller (Shake)");
      document.getElementById('displayArea').innerText = "Shake action received on Controller!";
    } else {
      console.log("Shake button pressed on Display");
      document.getElementById('displayArea').innerText = "Shake action received on Display!";
    }
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    if (isController) {
      console.log("Tilt button pressed on Controller");
      bc.postMessage('control-taken');
      console.log("Broadcast message sent from Controller (Tilt)");
      document.getElementById('displayArea').innerText = "Tilt action received on Controller!";
    } else {
      console.log("Tilt button pressed on Display");
      document.getElementById('displayArea').innerText = "Tilt action received on Display!";
    }
  });

  document.getElementById('logPointsButton').addEventListener('click', function() {
    if (isController) {
      console.log("Log Points button pressed on Controller");
      bc.postMessage('control-taken');
      console.log("Broadcast message sent from Controller (Log Points)");
      document.getElementById('displayArea').innerText = "Log Points action received on Controller!";
    } else {
      console.log("Log Points button pressed on Display");
      document.getElementById('displayArea').innerText = "Log Points action received on Display!";
    }
  });
});
