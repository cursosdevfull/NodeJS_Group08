export interface MedicModel {
  id?: number;
  name: string;
  maternal_surname: string;
  paternal_surname: string;
  cmp: number;
  document: string;
  typeDocument: number;
  active?: boolean;
  dateCreated?: Date;
  dateUpdated?: Date;
}
