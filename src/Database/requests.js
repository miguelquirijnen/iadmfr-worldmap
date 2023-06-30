// Upload the message sketch to the database
const pushToDb = async (dataURL) => {
  fetch("http://localhost:5000/message", {
    method: "post",
    body: JSON.stringify({ data: dataURL }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await fetch("http://localhost:5000/message/", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(await res.json());
};
