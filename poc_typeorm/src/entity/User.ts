import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Car } from "./Car";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  /*  @OneToOne((type) => Car, (car) => car.user)
  car: Car; */

  /*  @OneToMany((type) => Car, (car) => car.user, { cascade: true })
  cars: Car[]; */

  /*@ManyToMany((type) => Car, (car) => car.users , { cascade: true } )
  cars: Promise<Car[]>;*/

  @ManyToMany((type) => Car, (car) => car.users)
  cars: Car[];
}
