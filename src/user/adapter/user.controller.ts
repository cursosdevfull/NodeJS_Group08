/* import UserUseCase from "@user/application/user.usecase";

export default class {
  constructor(private userUseCase: UserUseCase) {}

  list(request: any, response: any) {
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(this.userUseCase.list()));
    response.end();
  }

  getOne(request: any, response: any) {
    const email = request.params.email;
    response.writeHead(200, { "content-type": "application/json" });
    console.log(email);
    response.write(JSON.stringify(this.userUseCase.getOne(email)));
    response.end();
  }

  insert(request: any, response: any) {
    response.writeHead(200, { "content-type": "text/html" });
    response.write("<h1>Hello World/h1>");
    response.end();
  }
}
 */
