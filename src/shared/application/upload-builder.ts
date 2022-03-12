export class UploadBuilder {
  private vfieldName: string;
  private vmaxFileSize: number;
  private vdirectory: string;
  private visPublic: boolean;
  private vmimeTypesAllowed: string[];

  get fieldName() {
    return this.vfieldName;
  }

  get maxFileSize() {
    return this.vmaxFileSize;
  }

  get directory() {
    return this.vdirectory;
  }

  get isPublic() {
    return this.visPublic;
  }

  get mimeTypesAllowed() {
    return this.vmimeTypesAllowed;
  }

  addFieldName(fieldName: string) {
    this.vfieldName = fieldName;
    return this;
  }

  addMaxFileSize(maxFileSize: number) {
    this.vmaxFileSize = maxFileSize;
    return this;
  }

  addDirectory(directory: string) {
    this.vdirectory = directory;
    return this;
  }

  addIsPublic(isPublic: boolean) {
    this.visPublic = isPublic;
    return this;
  }

  addMimeTypesAllowed(mimeTypesAllowed: string[]) {
    this.vmimeTypesAllowed = mimeTypesAllowed;
    return this;
  }

  build() {
    return new UploadOptions(this);
  }
}

export class UploadOptions {
  readonly fieldName: string;
  readonly maxFileSize: number;
  readonly directory: string;
  readonly isPublic: boolean;
  readonly mimeTypesAllowed: string[];

  constructor(ub: UploadBuilder) {
    this.fieldName = ub.fieldName;
    this.maxFileSize = ub.maxFileSize;
    this.directory = ub.directory;
    this.isPublic = ub.isPublic;
    this.mimeTypesAllowed = ub.mimeTypesAllowed;
  }
}
