import UserUseCase from "../application/user.usecase";
import UserOperation from "../infraestruture/user.operation";

const userOperation = new UserOperation();
const userUseCase = new UserUseCase(userOperation);

export default class {
  list(request: any, response: any) {
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(userUseCase.list()));
    response.end();
  }

  getOne(request: any, response: any) {
    const age = +request.params.age;
    /*     const users = [
      { name: "Juan", age: 20 },
      { name: "Pedro", age: 30 },
      { name: "Maria", age: 40 },
    ];

    const userFiltered = users.filter((user) => user.age === age); */
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(userUseCase.getOne(age)));
    response.end();
  }

  insert(request: any, response: any) {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>Hello World/h1>");
    response.end();
  }
}
