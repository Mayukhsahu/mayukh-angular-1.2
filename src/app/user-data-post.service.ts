import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class UserDataPostService {
  

  constructor() { }

  async postUserData(url: string, data: any): Promise<any> {
    try {
      const response = await axios.post(url, data)
      console.log(response['data'])
    }
    catch(error: any) {
      console.log(error)
    }
  }
}
