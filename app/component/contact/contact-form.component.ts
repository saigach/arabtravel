import { Component, OnInit } from '@angular/core'
import { MLService } from '../../service/ml.service'
import { MLString } from '../../../model/common'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise'

const options = new RequestOptions({
  headers: new Headers({
   'Content-Type': 'application/json'
  })
 })

@Component({
	moduleId: module.id,
	selector: 'contact-form',
	templateUrl: '/app/component/contact/contact-form.component.html'
})
export class ContactFormComponent implements OnInit {

    ml: { [key:string]: MLString } = {}
    name:string = ''
    email:string = ''
    message:string = ''

    constructor(private mlService: MLService, private http: Http) {}

    ngOnInit(): void {
        this.mlService.get().then( ml => this.ml = ml)
    }

    submit(event:Event): void {
        event.preventDefault()
        console.log(this.name, this.email, this.message)
        let postData = JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message
        })
        this.http.post('/en/api/message', postData, options).toPromise()
        .then(()=>{
            UIkit.notify("Your message have been sent", {status:'success', pos: 'bottom-center'})
        }).catch((response:any)=>{
            let resp = response.json() || {error:'unknown error'}
        })
    }
}
