import Result from '@shared/application/result.interface';
import { UserModel } from './user.model';
import yenv from 'yenv';

const env = yenv();

export class UserListDto {
  static mapping(result: Result<UserModel>): Result<UserModel> {
    let data: UserModel[] = result.payload.data as UserModel[];
    data = data.map((el: UserModel) => {
      el.photo = `${env.S3.bucketPath}/${el.photo}`;
      return el;
    });

    result.payload.data = data;
    return result;
  }
}
