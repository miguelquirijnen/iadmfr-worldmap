// Upload the message sketch to the database
export async function pushToDb(data, x, y, w, h, continent) {
  console.log("posting: ", x, y, w, h, continent);

  const res = await fetch("http://localhost:5000/message", {
    method: "post",
    body: JSON.stringify({
      dataURL: data,
      xcoord: x,
      ycoord: y,
      width: w,
      height: h,
      continent: continent,
      date: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log((await res.json()) + " - " + new Date());
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
