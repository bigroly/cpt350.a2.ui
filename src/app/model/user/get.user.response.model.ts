import { User } from './user.model';
import { BaseResponse } from './../base.response.model';

export interface GetUserResponse extends BaseResponse {
  user: User;
}