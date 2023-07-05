import { Injectable } from '@angular/core';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class UserDataPostService {

  async postUserData(url: string, data: any): Promise<any> {
    try {
      const response = await axios.post(url, data)
      return response['data']
    }
    catch(error: any) {
      console.log(error);
    }
  }

  async getBenefits(url: string): Promise<any> {
    try {
      const response = await axios.get(url)
      return response.data
    }
    catch(error: any) {
      console.log(error);
    }
  }
}
