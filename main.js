// main.js
document.addEventListener('DOMContentLoaded', function() {
  alert("main.js loaded"); // Verify file load

  // Determine if this instance is a Controller based on a query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const isController = urlParams.has('controller'); // e.g., URL: .../LiftandEarn/?controller
  alert("isController: " + isController);
  console.log("Is Controller:", isController);

  // Initialize BroadcastChannel if available.
  let bc;
  if ('BroadcastChannel' in window) {
    bc = new BroadcastChannel('liftandearn_channel');
    bc.onmessage = function(event) {
      console.log("BroadcastChannel message received:", event.data);
      alert("Display: Received message via BroadcastChannel: " + event.data);
      if (!isController && event.data === 'control-taken') {
        // On the Display, hide the QR code and update the display area.
        const qrContainer = document.getElementById('qrContainer');
        if (qrContainer) {
          qrContainer.style.display = 'none';
        }
        document.getElementById('displayArea').innerText = "Control taken by Controller.";
      }
    };
  } else {
    alert("BroadcastChannel not supported!");
  }

  // Set up a localStorage fallback for messaging.
  window.addEventListener('storage', function(event) {
    if (!isController && event.key === 'liftandearn_message') {
      console.log("LocalStorage event received:", event.newValue);
      alert("Display: Received message via localStorage: " + event.newValue);
      try {
        let data = JSON.parse(event.newValue);
        if (data.message === 'control-taken') {
          const qrContainer = document.getElementById('qrContainer');
          if (qrContainer) {
            qrContainer.style.display = 'none';
          }
          document.getElementById('displayArea').innerText = "Control taken by Controller (via localStorage).";
        }
      } catch (e) {
        console.error("Error parsing localStorage message", e);
      }
    }
  });

  // Function to send a message.
  function sendMessage(message) {
    if (bc) {
      bc.postMessage(message);
      console.log("Message sent via BroadcastChannel:", message);
      alert("Controller: Sent message via BroadcastChannel: " + message);
    }
    // Also use localStorage fallback.
    localStorage.setItem('liftandearn_message', JSON.stringify({ message: message, timestamp: Date.now() }));
    console.log("Message sent via localStorage fallback:", message);
    alert("Controller: Sent message via localStorage fallback: " + message);
  }

  // On the Display, generate the QR code.
  if (!isController) {
    console.log("Display: Generating QR code");
    alert("Display: Generating QR code");
    generateQRCode("qrContainer", window.location.href + "?controller");
  } else {
    console.log("Controller: Hiding QR code container");
    alert("Controller: Hiding QR code container");
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
      alert("Controller: About to send 'control-taken' broadcast (Shake).");
      sendMessage('control-taken');
      document.getElementById('displayArea').innerText = "Shake action received on Controller!";
      alert("Controller: Display area updated (Shake).");
    } else {
      alert("Display: Shake button pressed.");
      console.log("Shake button pressed on Display");
      document.getElementById('displayArea').innerText = "Shake action received on Display!";
    }
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Tilt button pressed.");
      console.log("Tilt button pressed on Controller");
      alert("Controller: About to send 'control-taken' broadcast (Tilt).");
      sendMessage('control-taken');
      document.getElementById('displayArea').innerText = "Tilt action received on Controller!";
      alert("Controller: Display area updated (Tilt).");
    } else {
      alert("Display: Tilt button pressed.");
      console.log("Tilt button pressed on Display");
      document.getElementById('displayArea').innerText = "Tilt action received on Display!";
    }
  });

  document.getElementById('logPointsButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Log Points button pressed.");
      console.log("Log Points button pressed on Controller");
      alert("Controller: About to send 'control-taken' broadcast (Log Points).");
      sendMessage('control-taken');
      document.getElementById('displayArea').innerText = "Log Points action received on Controller!";
      alert("Controller: Display area updated (Log Points).");
    } else {
      alert("Display: Log Points button pressed.");
      console.log("Log Points button pressed on Display");
      document.getElementById('displayArea').innerText = "Log Points action received on Display!";
    }
  });
});
