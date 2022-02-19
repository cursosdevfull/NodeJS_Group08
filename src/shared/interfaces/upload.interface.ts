export interface IUpload {
  fieldName: string;
  maxFileSize: number;
  directory: string;
  isPublic: boolean;
  mimeTypesAllowed: string[];
}
