import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "car" })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturer: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column()
  isSold: boolean;

  /*   @OneToOne((type) => User, (user) => user.car, { cascade: true })
  @JoinColumn()
  user: User; */

  /*   @ManyToOne((type) => User, (user) => user.cars)
  user: User; */

  @ManyToMany((type) => User, (user) => user.cars, { eager: true })
  @JoinTable()
  users: User[];
}
