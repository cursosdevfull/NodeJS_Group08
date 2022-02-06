import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Base from "./base";
import { User } from "./user.entity";

@Entity({ name: "role" })
export class Role extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 1000 })
  actions: string;

  @ManyToMany((type) => User, (user) => user.roles)
  users: User[];
}
