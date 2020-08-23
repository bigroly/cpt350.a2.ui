import { GetFileResponse } from './../../model/files/get.file.response.model';
import { PostFileResponse } from './../../model/files/post.file.response.model';
import { PostFileRequest } from './../../model/files/post.file.request.model';
import { BaseService } from './../common/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../common/auth.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService extends BaseService {

  private apiUrl: string = `${environment.apiUrl}/api/files`;
  
  constructor(
    public _httpClient: HttpClient, 
    public _authService: AuthService,
    private _toastr: ToastrService) { 
    super(_httpClient, _authService);
  }

  public postFile(request: PostFileRequest): Promise<PostFileResponse>{
    return new Promise(resolve => {
      this._httpClient.post<PostFileResponse>(this.apiUrl, request, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error creating user');
        }
      });
    })
  }

  public getFileByKey(fileKey: string): Promise<GetFileResponse>{
    return new Promise(resolve => {
      this._httpClient.get<GetFileResponse>(`${this.apiUrl}?fileKey=${fileKey}`, { headers: this.generateHeader() }).toPromise().then(res => {
        if(res.success){
          resolve(res);
        }else{
          this._toastr.error(res.errorMessage, 'Error getting Users');
        }
			});
    });
  }

}
