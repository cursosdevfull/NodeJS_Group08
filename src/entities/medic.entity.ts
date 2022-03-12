import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BasePersonal from './base-personal';

@Entity({ name: 'medic' })
export class Medic extends BasePersonal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  cmp: string;

  @Column({ type: 'varchar', length: 20 })
  document: string;

  @Column({ type: 'int' })
  typeDocument: number;
}
