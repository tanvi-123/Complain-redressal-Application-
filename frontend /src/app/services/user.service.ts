import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  localData: any = [];
  loginData:any = []
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data1: any)  {
    // console.warn(data1);
   
    
    return this.http
      .post('http://localhost:4000/api/user/login', data1, {
        observe: 'response',
      })
  }


  getuser(): Observable<any> {
    return this.http.get('http://localhost:4000/api/user/get');
  }

  getSingleUser(id: any): Observable<any> {
    // console.log(id);

    return this.http.get(`http://localhost:4000/api/user/get/single/${id}`);
  }

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:4000/api/user/delete/${id}`);
  }

  createUser(data: any): Observable<any> {
    // console.warn(data);
    return this.http.post('http://localhost:4000/api/user/create', data);
  }

  updateEngineer(_id:any,data:any):Observable<any>{
    // console.warn("assign id",_id);
    // console.warn(data);
    
    
    return this.http.put(`http://localhost:4000/api/complain/update/assigned/engineer/${_id}`,data)
  }

  updateUser(data: any, id: any): Observable<any> {
    return  this.http.put(`http://localhost:4000/api/user/update/${id}`, data);
  }

  updateUserPassword(password:any , id:any):Observable<any>{
    // console.warn(password);
    
    return this.http.put(`http://localhost:4000/api/user/update/password/${id}`, password);
  }

  updateUserApproval(isActive:any , id:any):Observable<any>{
    // console.warn(password);
    
    return this.http.put(`http://localhost:4000/api/user/update/isActive/${id}`, isActive);
  }

 
}
