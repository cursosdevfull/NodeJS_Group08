import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "familyRefreshTokens" })
export class FamilyRefreshTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  refreshToken: string;

  @Column({ type: "bool", default: true })
  status: boolean;

  @ManyToOne((type) => User, (user) => user.familyRefreshTokens)
  user: User;
}
