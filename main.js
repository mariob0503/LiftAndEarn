// main.js
document.addEventListener('DOMContentLoaded', function() {
  alert("main.js loaded"); // Verify file load

  // Determine if this instance is a Controller based on a query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const isController = urlParams.has('controller'); // e.g., URL: .../LiftAndEarn/?controller
  alert("isController: " + isController);
  console.log("Is Controller:", isController);

  // Initialize BroadcastChannel if available.
  let bc;
  if ('BroadcastChannel' in window) {
    bc = new BroadcastChannel('liftandearn_channel');
    bc.onmessage = function(event) {
      console.log("BroadcastChannel message received:", event.data);
      alert("Display: Received message via BroadcastChannel: " + event.data);
      debugger; // Pause execution here for debugging.
      if (!isController) {
        if (event.data === 'control-taken') {
          console.log("Display: Received 'control-taken'");
          const qrContainer = document.getElementById('qrContainer');
          if (qrContainer) {
            qrContainer.style.display = 'none';
          }
          document.getElementById('displayArea').innerText = "Control taken by Controller.";
        } else if (event.data === 'log-points') {
          console.log("Display: Received 'log-points' - redirecting now");
          // Redirect the Display to the desired URL.
          window.location.href = "https://mariob0503.github.io/simplix/";
        }
      }
    };
  } else {
    alert("BroadcastChannel not supported!");
  }

  // Setup localStorage fallback for messaging.
  window.addEventListener('storage', function(event) {
    if (!isController && event.key === 'liftandearn_message') {
      console.log("Display: LocalStorage event received:", event.newValue);
      alert("Display: Received message via localStorage: " + event.newValue);
      try {
        let data = JSON.parse(event.newValue);
        if (data.message === 'control-taken') {
          const qrContainer = document.getElementById('qrContainer');
          if (qrContainer) {
            qrContainer.style.display = 'none';
          }
          document.getElementById('displayArea').innerText = "Control taken by Controller (via localStorage).";
        } else if (data.message === 'log-points') {
          console.log("Display: Received 'log-points' via localStorage - redirecting now");
          window.location.href = "https://mariob0503.github.io/simplix/";
        }
      } catch (e) {
        console.error("Error parsing localStorage message", e);
      }
    }
  });

  // Function to send a control message from the Controller.
  function sendControlMessage(message) {
    if (bc) {
      bc.postMessage(message);
      console.log("Controller: Message sent via BroadcastChannel:", message);
      alert("Controller: Sent message via BroadcastChannel: " + message);
    }
    localStorage.setItem('liftandearn_message', JSON.stringify({ message: message, timestamp: Date.now() }));
    console.log("Controller: Message sent via localStorage fallback:", message);
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
      console.log("Controller: Shake button pressed");
      alert("Controller: About to send 'control-taken' message (Shake).");
      sendControlMessage('control-taken');
      alert("Controller: Message sent (Shake).");
      document.getElementById('displayArea').innerText = "Shake action received on Controller!";
      alert("Controller: Display area updated (Shake).");
    } else {
      alert("Display: Shake button pressed.");
      console.log("Display: Shake button pressed");
      document.getElementById('displayArea').innerText = "Shake action received on Display!";
    }
  });

  document.getElementById('tiltButton').addEventListener('click', function() {
    if (isController) {
      alert("Controller: Tilt button pressed.");
      console.log("Controller: Tilt button 
