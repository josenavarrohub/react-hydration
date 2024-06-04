// Node.js built-in modules
import fs from "fs";
import http from "http";

// React
import React from "react";
import ReactDOMServer from "react-dom/server";

// Data
const fruits = [
  { name: "Banana", icon: "🍌", price: 0.8 },
  { name: "Lemon", icon: "🍋", price: 0.2 },
  { name: "Orange", icon: "🍊", price: 0.4 },
  { name: "Watermelon", icon: "🍉", price: 2.4 },
  { name: "Pineapple", icon: "🍍", price: 3.0 },
];

// Components
const FruitItem = ({ fruit }) => {
  const [quantity, setQuantity] = React.useState(0);
  return (
    <li className="c-fruit-item" key={fruit.name}>
      <span>
        {fruit.icon} {fruit.name}
      </span>
      <span>
        {quantity} x {fruit.price} € = {(quantity * fruit.price).toFixed(2)} €
      </span>
      <button onClick={() => setQuantity((q) => q + 1)}>+1</button>
    </li>
  );
};

const FruitList = () => {
  return (
    <div className="c-fruit-list">
      <h1>💦 React Hydration 💦</h1>
	  <p>This component has been rendered on the server!</p>
      <ul>
        {fruits.map((fruit) => (
          <FruitItem fruit={fruit} key={fruit.name} />
        ))}
      </ul>
    </div>
  );
};

// HTML template
const template = fs.readFileSync("./index.html", "utf-8");

// Creates an HTTP server
const server = http.createServer((req, res) => {
  // Home
  if (req.url === "/") {
    const html = template.replace(
      '<div id="root"></div>',
      `<div id='root'>${ReactDOMServer.renderToString(<FruitList />)}</div>`
    );
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(html);

    // CSS files
  } else if (req.url.endsWith(".css")) {
    const css = fs.readFileSync(`.${req.url}`, "utf-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);

    // JS files
  } else if (req.url.endsWith(".js")) {
    const js = fs.readFileSync(`.${req.url}`, "utf-8");
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end(js);

    // SVG files
  } else if (req.url.endsWith(".svg")) {
    const svg = fs.readFileSync(`.${req.url}`, "utf-8");
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(svg);

    // Url not found
  } else {
    const html = template.replace(
      '<div id="root"></div>',
      `<div id='root'><h1>Url not found</h1></div>`
    );
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(html);
  }
});

// Start the server listening for incoming requests
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on: http://127.0.0.1:8000");
});
