import { Component } from '@angular/core';
import * as XLSX from 'xlsx'
import { validator } from './utils/configs/validatorConfig';
import { 
  isEmpty,
  isAlphanumeric,
  isInteger,
  maxAge,
  hasAlphabets,
  maxLength,
  isGenderValid
} from './utils/validationMethods';
import { UserDataPostService } from './user-data-post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'xlxs-validation';
  testData: any = [];
  idArr: number[] = [];
  postData: any = {};
  validityCheck = true;
  displayData = "";
  isLoading = false;
  premiumCalculated = 0;

  constructor(private apiService: UserDataPostService) {}

  validateExcelData(testData: any[]) {
    this.validityCheck = true;
    const functionArray = [isEmpty, isAlphanumeric, isInteger, maxAge, hasAlphabets, maxLength, isGenderValid]; // Storing function array.
    functionArray.forEach(item => (window as any)[item.name] = item); // Assigning functions to window obj to make available to ts.

    for (const dataObj of testData) { // Iterating trough testData array of obj.
      Object.keys(dataObj).forEach(key => {
        if (key !== "__rowNum__"){
          const validatorFuncArray: string[] = validator[key].validations  // Getting array validations functions reference.
          validatorFuncArray.forEach(element => {
            const validationFunc = (window as any)[element] as Function; // Accessing validations function from window using reference names dynamically.
            const functionDataArg: string | number = dataObj[key]
            if (typeof validationFunc === 'function') {
              const isDataVlid = validationFunc(functionDataArg.toString(), key.toString(), dataObj.__rowNum__);  
              if (!isDataVlid) {
                this.validityCheck = false;
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
      this.validateExcelData(this.testData);
    }
  }
  
  
  combineCompanyDetails(companyDetails: {name: string, category: string, details: string}) {
    this.postData.quoteDetails = companyDetails
  }
  
  combinePostData(idArray: number[]){
    this.idArr = idArray
    if (this.validityCheck) {
        this.postData = {...this.postData, benefitsIdArr: this.idArr, employeeDetails: this.testData}
    }

  }
  async submitData() {
    try {
      this.isLoading = true
       const premium = await this.apiService.postUserData('http://localhost:5000/post-user-data', this.postData);
       if (typeof premium === "number") {
        this.premiumCalculated = premium
       }

    }
    catch(err) {
      console.log(err)
    }
    finally {
      this.isLoading = false
    }
    
  }
}
