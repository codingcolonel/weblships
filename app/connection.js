import { CodeCrypt } from "./codecrypt.js";
// -- Initialize Variables --

// HTML elements
const codeOut = document.getElementById("codeOut");
const codeIn = document.getElementById("codeIn");

const msgOut = document.getElementById("out");
const msgIn = document.getElementById("in");

const connectBtn = document.getElementById("connect");
const sendBtn = document.getElementById("send");

// Global Variables

let status = getStatusProxy();
/*
const ably = new Ably.Realtime.Promise({
  authCallback: async (_, callback) => {
    try {
      const tokenRequest = await fetch(
        `${location.origin}/.netlify/functions/token?}`
      );
      const token = await tokenRequest.json();
      callback(null, token);
    } catch (error) {
      callback(error, null);
    }
  },
});
*/
if (typeof ably !== "undefined") status = "enabled";

// const servers = fetch(`${location.origin}/.netlify/functions/creds`);

window.myStatus = status;

const codecrypt = new CodeCrypt();
codeOut.innerHTML = codecrypt.authenticator;

if (status === "enabled" && servers) {
  // -- Ably Setup --
  const channel = ably.channels.get("requests");

  await channel.subscribe("offer", (msg) => {});

  // -- Add Event Listeners --
  connectBtn.addEventListener("click", clickHandler);
  sendBtn.addEventListener("click", clickHandler);
} else {
  displayError("Unable to connect");
}

// -- Functions --

function getStatusProxy() {
  let trueStatus = {
    status: "disabled",
    onenabled: undefined,
    onwaiting: undefined,
    onoffering: undefined,
    onanswering: undefined,
    onconnected: undefined,
    ondisconnected: undefined,
  };
  let handler = {
    set(target, key, value) {
      if (key === "status" && target["on" + value]) target["on" + value]();
      target[key] = value;
    },
  };
  return new Proxy(trueStatus, handler);
}

function clickHandler(event) {
  let id = event.target.id;

  switch (id) {
    case "connect":
      let value = codeIn.value;
      if (validateCode(value)) console.log(value);
      break;
    case "send":
      break;
  }
}

/**
 * Test inputted code for validity
 *
 * @param {string} code
 * @returns True if code is hex & six digits long, else returns false
 */
function validateCode(code) {
  if (code.match(/([^0-9A-Fa-f])+/gm)) return false;
  if (code.length === 6) return true;
  return false;
}

function displayError(errorMsg) {}
