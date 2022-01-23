// Domain
interface Audit {
  dateCreated: Date;
  dateUpdated: Date;
}

interface Commons extends Audit {
  name: string;
  lastname: string;
}

interface Medic extends Commons {
  age: number;
}

interface Driver extends Commons {
  license: string;
}

interface History extends Commons {
  medicId: number;
  driverId: number;
  numberHistory: number;
}

interface User extends Audit {
  email: string;
  password: string;
}

// Application
type ID = number | string;

interface Repository<T> {
  insert(entity: T): T;
  update(id: ID, entity: T): T;
  delete(id: ID): T;
  list(): T[];
  getOne(id: ID): T;
}

interface IMedic extends Repository<Medic> {
  getByPage(pageSize: number, page: number): Medic[];
}

interface IDriver extends Repository<Driver> {}

interface IHistory extends Repository<History> {}

interface IUser extends Repository<User> {}

/* interface Repository {
  insert(medic: Medic): Medic;
}

interface RepositoryDriver {
  insert(medic: Driver): Driver;
}

interface RepositoryHistory {
  insert(medic: History): History;
} */

class SharedUseCase<T, U extends Repository<T>> {
  constructor(public repository: U) {}

  insert(entity: T) {
    return this.repository.insert(entity);
  }

  update(id: ID, entity: T) {
    return this.repository.update(id, entity);
  }

  delete(id: ID) {
    return this.repository.delete(id);
  }

  list() {
    return this.repository.list();
  }

  getOne(id: ID) {
    return this.repository.getOne(id);
  }
}

class MedicUseCase extends SharedUseCase<Medic, IMedic> {
  constructor(public operation: IMedic) {
    super(operation);
  }

  override insert(medic: Medic) {
    medic.name = medic.name.toUpperCase();
    medic.lastname = medic.lastname.toUpperCase();
    return this.operation.insert(medic);
  }
}

class DriverUseCase extends SharedUseCase<Driver, IDriver> {
  constructor(public operation: IDriver) {
    super(operation);
  }
}

class HistoryUseCase extends SharedUseCase<History, IHistory> {
  constructor(public operation: IHistory) {
    super(operation);
  }
}

class UserUseCase extends SharedUseCase<User, IUser> {
  constructor(public operation: IUser) {
    super(operation);
  }
}

// Infraestructure
class SharedOperation<T> {
  update(id: ID, entity: T): T {
    return entity;
  }
  delete(id: ID): T {
    return {} as T;
  }
  list(): T[] {
    return [] as T[];
  }
  getOne(id: ID): T {
    return {} as T;
  }
  insert(entity: T): T {
    return entity;
  }
}

class MedicOperation extends SharedOperation<Medic> implements IMedic {
  constructor() {
    super();
  }

  getByPage(pageSize: number, page: number): Medic[] {
    return [
      {
        name: "Sergio",
        lastname: "Hidalgo",
        age: 40,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
      {
        name: "Luis",
        lastname: "Carmona",
        age: 20,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      },
    ];
  }
}

class DriverOperation extends SharedOperation<Driver> implements IDriver {
  constructor() {
    super();
  }
}

class HistoryOperation extends SharedOperation<History> implements IHistory {
  constructor() {
    super();
  }
}

class UserOperation extends SharedOperation<User> implements IUser {
  constructor() {
    super();
  }
}

const medic: Medic = {
  name: "Jorge",
  lastname: "Montoya",
  age: 35,
  dateCreated: new Date(),
  dateUpdated: new Date(),
};
const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
console.log(medicUseCase.insert(medic));
