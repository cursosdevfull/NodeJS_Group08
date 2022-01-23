class Medic {
  /* private name: string
    private lastname: string
    private age: number

    constructor(nameMedic: string, lastnameMedic: string, ageMedic: number) {
        this.name = nameMedic
        this.lastname = lastnameMedic
        this.age = ageMedic
    } */

  constructor(
    private name: string,
    private lastname: string,
    private age: number
  ) {}

  get valueName() {
    return this.name + " " + this.lastname;
  }

  set valueName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  getLastname(): string {
    return this.lastname;
  }

  getAge(): number {
    return this.age;
  }
}

const medic = new Medic("Juan", "Salinas", 20);
medic.valueName = "Alfredo";
console.log(medic.valueName, medic.getLastname(), medic.getAge());
