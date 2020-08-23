import { BaseResponse } from './../base.response.model';
export interface GetFileResponse extends BaseResponse {
  fileUrl: string;
}