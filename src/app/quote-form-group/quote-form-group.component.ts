import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-form-group',
  templateUrl: './quote-form-group.component.html',
  styleUrls: ['./quote-form-group.component.css']
})
export class QuoteFormGroupComponent {
  btnDisabled = false
  @Output() sendFormData = new EventEmitter()  

  quoteForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    details: new FormControl(''),
  })

  onConfirm() {
    this.btnDisabled = true
    this.sendFormData.emit(this.quoteForm.value)
  }

  enablebtn() {
    this.btnDisabled = false
    this.quoteForm.reset()
  }

}
