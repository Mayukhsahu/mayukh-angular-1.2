import { verifyHostBindings } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
import { validator } from './utils/configs/validatorConfig';
import axios from 'axios';
import { 
  isEmpty,
  isAlphanumeric,
  isInteger,
  maxAge,
  hasAlphabets,
  maxLength,
  isGenderValid
} from './utils/validationMethods';
import { TestData } from './utils/interfaces';
import { UserDataPostService } from './user-data-post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'xlxs-validation';
  testData: any = [];
  validityCheck = true;
  displayData: string= "";

  constructor(private spinner: NgxSpinnerService, private apiService: UserDataPostService) {}

  ngOninit() {
    this.spinner.show()
  }

  validateExcelData(testData: any[]) {
    this.validityCheck = true;
    console.log(testData);
    const functionArray = [isEmpty, isAlphanumeric, isInteger, maxAge, hasAlphabets, maxLength, isGenderValid]; // Storing function array.
    functionArray.forEach(item => (window as any)[item.name] = item); // Assigning functions to window obj to make available to ts.

    for (const dataObj of testData) { // Iterating trough testData array of obj.
      Object.keys(dataObj).forEach(key => {
        if (key !== "__rowNum__"){
          const validatorFuncArray: string[] = validator[key].validations  // Getting array validations functions reference.
          validatorFuncArray.forEach(element => {
            // console.log(key);
            // console.log(element)
            const validationFunc = (window as any)[element] as Function; // Accessing validations function from window using reference names dynamically.
            const functionDataArg: string | number = dataObj[key]
            if (typeof validationFunc === 'function') {
              const isDataVlid = validationFunc(functionDataArg.toString(), key.toString(), dataObj.__rowNum__);  
              if (!isDataVlid) {
                this.validityCheck = false;
                // console.log(this.validityCheck)
                return;
              }
            }
            else {
              console.log(validationFunc, "is not a function.")
            }
          });
        }
      })
    }
  }

  onFileUpload(event: any) {
    this.testData = []
    const dataFile = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(dataFile)
    fileReader.onload = async (e) => {
      const jsonData = XLSX.read(fileReader.result, { type: 'binary' })
      const excelData = XLSX.utils.sheet_to_json(jsonData.Sheets[jsonData.SheetNames[0]])
      this.testData = excelData;
      // console.log(this.testData)
      // this.validateData(this.testData)
      this.validateExcelData(this.testData);
      if (this.validityCheck) {
        const responseData = await this.apiService.postUserData('http://localhost:3000/user-data', this.testData);
        console.log(responseData);
      }
    }
  }

}
