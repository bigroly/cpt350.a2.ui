import { User } from './user.model';
import { BaseResponse } from '../base.response.model';

export interface GetAllUsersResponse extends BaseResponse {
  users: User[];
}