type ACTION_USER =
  | "LIST_USER"
  | "GET_USER"
  | "INSERT_USER"
  | "UPDATE_USER"
  | "DELETE_USER";

type ACTION_MEDIC =
  | "LIST_MEDIC"
  | "GET_MEDIC"
  | "INSERT_MEDIC"
  | "UPDATE_MEDIC"
  | "DELETE_MEDIC";

type ACTION_EXPORT = "EXPORT_EXCEL" | "EXPORT_PDF";

export type ACTION = ACTION_USER & ACTION_MEDIC & ACTION_EXPORT;

export interface RoleModel {
  name: string;
  actions: ACTION[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
