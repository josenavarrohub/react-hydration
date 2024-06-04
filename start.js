// Configure Babel to transpile JSX code on the fly
require("@babel/register")({ extensions: [".js", ".jsx"] });

// Run the HTTP server 
require("./server.js");
