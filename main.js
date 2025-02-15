// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { generateQRCode } from "./qr.js";

// Firebase configuration (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyBkhEqivOcbkzd1MySLaNCRuSyeWbEz4UQ",
  authDomain: "simplixliftandearn.firebaseapp.com",
  databaseURL: "https://simplixliftandearn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "simplixliftandearn",
  storageBucket: "simplixliftandearn.firebasestorage.app",
  messagingSenderId: "901097563834",
  appId: "1:901097563834:web:7639d8d3eca0f986f34483",
  measurementId: "G-T680ZGWH3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Determine if this instance is a Controller based on the query parameter.
const urlParams = new URLSearchParams(window.location.search);
const isController = urlParams.has('controller');
console.log("Is Controller:", isController);

// On the Display, clear any old control message so the QR code remains visible until a new message arrives.
if (!isController) {
  set(ref(db, "liftandearn/control"), null)
    .then(() => {
      console.log("Display: Cleared old control message.");
      // Now generate the QR code that points to the Controller URL.
      generateQRCode("qrContainer", window.location.href + "?controller");
    })
    .catch((error) => {
      console.error("Display: Error clearing control message:", error);
      generateQRCode("qrContainer", window.location.href + "?controller");
    });
} else {
  // On the Controller, hide the QR code container.
  const qrContainer = document.getElementById("qrContainer");
  if (qrContainer) {
    qrContainer.style.display = "none";
  }
  console.log("Controller: QR code container hidden.");
}

// On the Display, set up a realtime listener for control messages.
if (!isController) {
  const controlRef = ref(db, "liftandearn/control");
  onValue(controlRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Display received control message:", data);
    if (data) {
      if (data.message === "controller-online") {
        // When the Controller comes online, hide the QR code and show the control message.
        const qrContainer = document.getElementById("qrContainer");
        if (qrContainer) {
          qrContainer.style.display = "none";
        }
        document.getElementById("displayArea").innerText = "Control taken by Controller.";
      } else if (data.message === "shake-action") {
        document.getElementById("displayArea").innerText = "Shake action received on Display!";
      } else if (data.message === "tilt-action") {
        document.getElementById("displayArea").innerText = "Tilt action received on Display!";
      } else if (data.message === "log-points") {
        console.log("Display: Received 'log-points' message. Redirecting...");
        window.location.href = "https://mariob0503.github.io/simplix/";
      }
    }
  });
}

// Function for the Controller to send a control message.
function sendControlMessage(message) {
  set(ref(db, "liftandearn/control"), {
    message: message,
    timestamp: Date.now()
  })
    .then(() => {
      console.log("Controller: Sent message:", message);
    })
    .catch((error) => {
      console.error("Controller: Error sending message:", error);
    });
}

// On the Controller, immediately send a "controller-online" message when the page loads.
if (isController) {
  sendControlMessage("controller-online");
}

// Button event listeners.
document.getElementById("shakeButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Shake button pressed");
    sendControlMessage("shake-action");
    document.getElementById("displayArea").innerText = "Shake action received on Controller!";
  } else {
    document.getElementById("displayArea").innerText = "Shake action received on Display!";
  }
});

document.getElementById("tiltButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Tilt button pressed");
    sendControlMessage("tilt-action");
    document.getElementById("displayArea").innerText = "Tilt action received on Controller!";
  } else {
    document.getElementById("displayArea").innerText = "Tilt action received on Display!";
  }
});

document.getElementById("logPointsButton").addEventListener("click", () => {
  if (isController) {
    console.log("Controller: Log Points button pressed");
    sendControlMessage("log-points");
    document.getElementById("displayArea").innerText = "Log Points action received on Controller!";
  } else {
    document.getElementById("displayArea").innerText = "Log Points action received on Display!";
  }
});
