import express from "express";

const app = express();

// route "/api/products"

/* 
controller {
  res.json({data: "products"})
}
*/

app.get("/api/products", (req, res) => {
	res.json({ data: "products" });
});

app.get("/api/services", (req, res) => {
	res.json({ data: "service" });
});

app.listen(8000, () => console.log("listening 8000"));
