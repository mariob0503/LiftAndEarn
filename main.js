// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Determine if this instance is a Controller based on a query parameter.
  const urlParams = new URLSearchParams(window.location.search);
  const isController = urlParams.has('controller'); // e.g., URL: .../LiftandEarn/?controller
  console.log("Is Controller:", isController);

  // Initialize messaging mechanism.
  let channel;
  let useLocalStorageFallback = false;
  
  if ('BroadcastChannel' in window) {
    channel = new BroadcastChannel('liftandearn_channel');
    channel.onmessage = function(event) {
      console.log("BroadcastChannel message received:", event.data);
      debugger; // Breakpoint for debugging.
      if (!isController && event.data === 'control-taken') {
        console.log("Received 'control-taken' on Display via BroadcastChannel");
        const qrContainer = document.getElementById('qrContainer');
        if (qrContainer) {
          qrContainer.style.display = 'none';
        }
        document.getElementById('displayArea').innerText = "Control taken by Controller.";
      }
    };
  } else {
    // Fallback: Use localStorage events.
    useLocalStorageFallback = true;
    window.addEventListener('storage', function(event) {
      if (!isController && event.key === 'liftandearn_message') {
        try {
          let data = JSON.parse(event.newValue);
          console.log("LocalStorage event received:", data);
          if (data.message === 'control-taken') {
            const qrContainer = document.getElementById('qrContainer');
            if (qrContainer) {
              qrContainer.style.display = 'none';
            }
            document.getElementById('displayArea').innerText = "Control taken by Controller.";
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  // Function to send a message from the Controller.
  function sendMessage(message) {
    if (channel) {
      channel.postMessage(message);
      console.log("Message sent via BroadcastChannel:", message);
    } else if (useLocalStorageFallback) {
      localStorage.setItem('liftandearn_message', JSON.stringify({ message: message, timestamp: Date.now() }));
      console.log("Message sent via localStorage:", message);
    }
  }

  // On the Display (without ?controller), generate the QR code.
  if (!isController) {
    console.log("Display: Generating QR code");
    // Generate a QR code that points to the Controller version.
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
      console.log("Shake button pressed on Controller");
      sendMessage('control-taken');
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
      sendMessage('control-taken');
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
      sendMessage('control-taken');
      console.log("Broadcast message sent from Controller (Log Points)");
      document.getElementById('displayArea').innerText = "Log Points action received on Controller!";
    } else {
      console.log("Log Points button pressed on Display");
      document.getElementById('displayArea').innerText = "Log Points action received on Display!";
    }
  });
});
