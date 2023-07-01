// Upload the message sketch to the database
export async function pushToDb(data, x, y, w, h, continent) {
  await fetch("http://localhost:5000/message", {
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
  const res = await fetch("http://localhost:5000/messages/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}
