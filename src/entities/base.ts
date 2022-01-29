import { BeforeInsert, BeforeUpdate, Column } from "typeorm";

export default class Base {
  @Column({ type: "datetime" })
  dateCreated: Date;

  @Column({ type: "datetime" })
  dateUpdated: Date;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @BeforeInsert()
  addDateCreated() {
    this.dateCreated = new Date();
    this.dateUpdated = new Date();
  }

  @BeforeUpdate()
  addDateUpdated() {
    this.dateUpdated = new Date();
  }
}
