export class UploadBuilder {
  private _fieldName: string;
  private _maxFileSize: number;
  private _directory: string;
  private _isPublic: boolean;
  private _mimeTypesAllowed: string[];

  get fieldName() {
    return this._fieldName;
  }

  get maxFileSize() {
    return this._maxFileSize;
  }

  get directory() {
    return this._directory;
  }

  get isPublic() {
    return this._isPublic;
  }

  get mimeTypesAllowed() {
    return this._mimeTypesAllowed;
  }

  addFieldName(fieldName: string) {
    this._fieldName = fieldName;
    return this;
  }

  addMaxFileSize(maxFileSize: number) {
    this._maxFileSize = maxFileSize;
    return this;
  }

  addDirectory(directory: string) {
    this._directory = directory;
    return this;
  }

  addIsPublic(isPublic: boolean) {
    this._isPublic = isPublic;
    return this;
  }

  addMimeTypesAllowed(mimeTypesAllowed: string[]) {
    this._mimeTypesAllowed = mimeTypesAllowed;
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
