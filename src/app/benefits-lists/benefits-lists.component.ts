import { Component, EventEmitter, Output } from '@angular/core';
import { UserDataPostService } from '../user-data-post.service';

@Component({
  selector: 'app-benefits-lists',
  templateUrl: './benefits-lists.component.html',
  styleUrls: ['./benefits-lists.component.css']
})
export class BenefitsListsComponent {
  benefitsList: {benefit: string, id: number}[] = [];
  isLoading = false
  idArray: number[] = []

  @Output() sendingData = new EventEmitter();
  constructor(private apiService: UserDataPostService){}

  async getBenefits() {
    try {
      this.isLoading = true
      const benefitRes = await this.apiService.getBenefits("http://localhost:5000/get-benefits")
      this.benefitsList = benefitRes
    }
    catch(err) {
      // console.log(err);
    }
    finally {
      this.isLoading = false
    }
  }

  addIdArray(event: any): void {
    const id = Number(event.target.value)
    if (event.target.checked && !this.idArray.includes(id)) {
      this.idArray.push(id)
    }
    else {
      this.idArray = this.idArray.filter(eachId => eachId !== id)
    }
    
  }

  sendBenefits(){
    this.sendingData.emit(this.idArray)
  }
}
