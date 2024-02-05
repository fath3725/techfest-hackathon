import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  typed: string | undefined;
  formGroup: FormGroup;
  spinnerState: boolean = false;

  data = [
    { "role": "user", "text": "hiii"},
    { "role": "bot", "text": "sample" }
  ];
  constructor(
    fb: FormBuilder,
    private http: HttpClient 
  ) {
    this.formGroup = fb.group({
      text: fb.control('')
    });
  }

  ngOnInit(): void {
    this.formGroup.reset();
  }
  title = 'chatbot';

  public callApi(){
    const text = this.formGroup.controls['text'].value;
    if (!text || !text.trim()){ 
    }
    else{
      this.data.push({"role":"user","text": text})
      this.formGroup.reset();
      this.spinnerState=true;
      // this.http.post('https://www.userdomain.com/api_name/data/',text, {responseType: 'json'}).subscribe(res =>{
      //   //add api code here
      // })
      setTimeout(()=>this.spinnerState=false, 10000)
      this.data.push({"role":"bot","text": "response"})

    }

   
    
   }

   
}
