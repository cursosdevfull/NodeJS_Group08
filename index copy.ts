import http from "http";

const paths = [
  {
    path: "/users",
    method: "GET",
    ftn: (request: any, response: any) => {
      const users = [
        { name: "Juan", age: 20 },
        { name: "Pedro", age: 30 },
        { name: "Maria", age: 40 },
      ];
      response.writeHead(200, { "content-type": "application/json" });
      response.write(JSON.stringify(users));
      response.end();
    },
  },
  {
    path: "/users",
    method: "POST",
    ftn: (request: any, response: any) => {
      response.writeHead(200, { "content-type": "text/html" });
      response.write("<h1>Hola mundo</h1>");
      response.end();
    },
  },
];

const server = http.createServer((request, response) => {
  console.log("request.url", request.url);

  const path = paths.find(
    (el) => el.path === request.url && el.method === request.method
  );

  if (path) {
    path?.ftn(request, response);
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.write("<h1>Not found</h1>");
    response.end();
  }

  /* if (request.url === "/users" && request.method?.toLowerCase() === "get") {
    const users = [
      { name: "Juan", age: 20 },
      { name: "Pedro", age: 30 },
      { name: "Maria", age: 40 },
    ];
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(users));
    response.end();
  } else if (
    request.url === "/users" &&
    request.method?.toLowerCase() === "post"
  ) {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>Hola mundo</h1>");
    response.end();
  } else {
    response.writeHead(404, { "content-type": "text/plain" });
    response.write("Not Found");
    response.end();
  } */

  /* if (request.url === "/") {
    response.writeHead(200, { "content-type": "text/plain" });
    response.write("Hola Mundo");
    response.end();
  } else if (request.url === "/users") {
    const users = [
      { name: "Juan", age: 20 },
      { name: "Pedro", age: 30 },
      { name: "Maria", age: 40 },
    ];
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(users));
    response.end();
  } else {
    response.writeHead(404, { "content-type": "text/plain" });
    response.write("Not Found");
    response.end();
  } */
});

server.listen(3000, () => console.log("Server is listening on port 3000"));
