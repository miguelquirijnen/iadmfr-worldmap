const DOMAIN = "192.168.0.222"
// const DOMAIN = "localhost"

const PORT = 5000

const BASE_URL = `http://${DOMAIN}:${PORT}`;

// Upload the message sketch to the database
export async function pushToDb(data, x, y, w, h, continent) {
  await fetch(BASE_URL + "/message", {
    method: "post",
    body: JSON.stringify({
      dataURL: data,
      xcoord: x || 0,
      ycoord: y || 0,
      width: w,
      height: h,
      continent: continent,
      date: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Get all message sketches from the database
export async function fetchMessages() {
  const res = await fetch(BASE_URL + "/messages/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

// Update all gives messages
export async function updateMessages(messages) {
  await fetch(BASE_URL + "/messages", {
    method: "put",
    body: JSON.stringify(messages),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
