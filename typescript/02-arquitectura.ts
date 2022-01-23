// Domain
interface Medic {
  name: string;
  lastname: string;
  age: number;
}

// Application
interface Repository {
  insert(medic: Medic): Medic;
}

class MedicUseCase {
  /* insert(name: string, lastname: string, age: number) {} */

  constructor(public medicOperation: Repository) {}

  insert(medic: Medic) {
    medic.name = medic.name.toUpperCase();
    medic.lastname = medic.lastname.toUpperCase();

    console.log(this.medicOperation.insert(medic));
    // this.medicOperation.update(medic, 1)
  }
}

// Infraestructure
class MedicOperation implements Repository {
  insert(medic: Medic): Medic {
    return medic;
  }

  update(medic: Medic, id: number): Medic {
    return medic;
  }
}

const medic: Medic = { name: "Jorge", lastname: "Montoya", age: 35 };
const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
medicUseCase.insert(medic);
