import multer from "multer";
import multer_s3 from "multer-s3";
import AWS from "aws-sdk";
import yenv from "yenv";
import { IError } from "@shared/helpers/errors.helper";
import { Request, NextFunction, Response } from "express";
import { UploadOptions } from "../../shared/application/upload-builder";

const env = yenv();

export type OptionsUploadType = UploadOptions | any;

export interface IUploadMultiple {
  saveMultiple(options: OptionsUploadType): any;
}
export interface IUploadImage {
  save(options: OptionsUploadType): any;
}

export class FactoryAWS implements IUploadImage, IUploadMultiple {
  S3 = new AWS.S3();

  save(options: OptionsUploadType) {
    return multer({
      limits: { fileSize: options.maxFileSize },
      storage: multer_s3({
        s3: this.S3,
        bucket: env.S3.bucketName,
        acl: options.isPublic ? "public-read" : "",
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, file, cb) {
          const mimeType = file.mimetype;
          const isFileAllowed = options.mimeTypesAllowed.includes(mimeType);
          const fileSize = file.size;

          if (!isFileAllowed) {
            const error: IError = new Error("File type not allowed");
            error.code = "LIMIT_FILE_TYPES";
            error.status = 422;
            return cb(error, null);
          }

          const partsFile = file.originalname.split("."); // nombreArchivo.extension
          const newName = Date.now().toString();
          const extension = partsFile[partsFile.length - 1];
          const newFileName = `${options.directory}/${newName}.${extension}`;
          req.body[options.fieldName] = newFileName;
          cb(null, newFileName);
        },
      }),
    }).single(options.fieldName);
  }

  saveMultiple(options: any) {
    /*     return multer({
      limits: { fileSize: options.maxFileSize },
      storage: multer_s3({
        s3: this.S3,
        bucket: env.S3.bucketName,
        acl: options.isPublic ? "public-read" : "",
        metadata(req, files, cb) {
          // cb(null, { fieldName: file.fieldname });
        },
        key(req: Request, files, cb) {
          for (const file in files) {
            const mimeType = file.mimetype;
            const isFileAllowed = options.mimeTypesAllowed.includes(mimeType);
            const fileSize = file.size;

            if (!isFileAllowed) {
              const error: IError = new Error("File type not allowed");
              error.code = "LIMIT_FILE_TYPES";
              error.status = 422;
              return cb(error, null);
            }

            const partsFile = file.originalname.split("."); // nombreArchivo.extension
            const newName = Date.now().toString();
            const extension = partsFile[partsFile.length - 1];
            const newFileName = `${options.directory}/${newName}.${extension}`;
            req.body[options.fieldName] = newFileName;
            cb(null, newFileName);
          }
        },
      }),
    }).array(options.fieldName); */
  }
}

export class FactoryGoogle implements IUploadImage {
  save(options: OptionsUploadType) {
    return false;
  }
}

export class FactoryAzure implements IUploadImage {
  save(options: OptionsUploadType) {
    return false;
  }
}
