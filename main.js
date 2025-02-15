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
    // This alert will appear only on the Display (for debugging, you may remove it)
    if (!isController && event.data === 'control-taken') {
      alert("Display: Received 'control-taken' message via BroadcastChannel.");
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
    console.log("Display: Generating QR code");
    generateQRCode("qrContainer", window.location.href + "?controller");
  } else {
    console.log("Controller: Hiding QR code container");
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer) {
      qrContainer.style.display = 'none';
    }
  }

  // Button event listeners.
  document.getElementById('shakeButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Shake button pressed.");
      console.log("Shake button pressed on Controller");
      alert("Controller: About to send broadcast message for Shake.");
      bc.postMessage('control-taken');
      alert("Controller: Broadcast message sent for Shake.");
      document.getElementById('displayArea').innerText = "Shake action received on Controller!";
      alert("Controller: Display area updated (Shake).");
    } else {
      console.log("Shake button pressed on Display");
      document.getElementById('displayArea').innerText = "Shake action received on Display!";
    }
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Tilt button pressed.");
      console.log("Tilt button pressed on Controller");
      alert("Controller: About to send broadcast message for Tilt.");
      bc.postMessage('control-taken');
      alert("Controller: Broadcast message sent for Tilt.");
      document.getElementById('displayArea').innerText = "Tilt action received on Controller!";
      alert("Controller: Display area updated (Tilt).");
    } else {
      console.log("Tilt button pressed on Display");
      document.getElementById('displayArea').innerText = "Tilt action received on Display!";
    }
  });

  document.getElementById('logPointsButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Log Points button pressed.");
      console.log("Log Points button pressed on Controller");
      alert("Controller: About to send broadcast message for Log Points.");
      bc.postMessage('control-taken');
      alert("Controller: Broadcast message sent for Log Points.");
      document.getElementById('displayArea').innerText = "Log Points action received on Controller!";
      alert("Controller: Display area updated (Log Points).");
    } else {
      console.log("Log Points button pressed on Display");
      document.getElementById('displayArea').innerText = "Log Points action received on Display!";
    }
  });
});
