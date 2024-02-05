import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


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
    { "role": "user", "text": "hiii" },
    { "role": "bot", "text": "sample" }
  ];
  constructor(
    fb: FormBuilder,
    private http: HttpClient
  ) {
    this.formGroup = fb.group({
      restaurantName: fb.control('', Validators.required),
      text: fb.control('')
    });
  }

  ngOnInit(): void {
    this.formGroup.reset();
  }
  title = 'chatbot';

  public callApi() {
    const text = this.formGroup.controls['text'].value;
    const name = this.formGroup.controls['restaurantName'].value;
    if (!name || !name.trim()) {
    }
    else {
      const fullQuery = "Restaurant: " + name + "\nQuestion: " + text;
      this.data.push({ "role": "user", "text": fullQuery })
      const apiCall = {
        restaurant: name, //string
        query: text //string
      }
      this.formGroup.reset();
      this.spinnerState = true;

      const headers = new HttpHeaders()
        .set('content-type', 'application/json');
        // .set('Access-Control-Allow-Origin', '*');

      // this.http.post('https://www.userdomain.com/api_name/data/',text, {headers: headers}).subscribe(res =>{
      //   //add api code here
      // })
      setTimeout(() => this.spinnerState = false, 10000)
      this.data.push({ "role": "bot", "text": "response" })

    }
  }


}
