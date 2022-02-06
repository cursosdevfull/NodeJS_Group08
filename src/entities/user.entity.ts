import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Base from "./base";
import { Role } from "./role.entity";

@Entity({ name: "user" })
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "datetime" })
  dateExpirationRefreshToken: Date;

  @ManyToMany((type) => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];
}
