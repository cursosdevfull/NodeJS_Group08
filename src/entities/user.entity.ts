import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Base from "./base";
import { FamilyRefreshTokens } from "./family-refresh-tokens.entity";
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
  photo: string;

  @ManyToMany((type) => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @OneToMany(
    (type) => FamilyRefreshTokens,
    (familyRefreshTokens) => familyRefreshTokens.user,
    { cascade: true }
  )
  familyRefreshTokens: FamilyRefreshTokens[];
}
