import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class APIService {
	private apiUrl : string = '/api';
	private headers = new Headers({
		'Content-Type': 'application/json'
	});

	private handleError(error: any): Promise<any> {
		console.error('An HTTP error occurred', error);
		return Promise.reject(error.message || error);
	}

	constructor(private http: Http) { }

	getList(model: string): Promise<any> {
		return this.http.get(`${this.apiUrl}/${model}`)
					.toPromise()
					.then(response => response.json())
					.catch(this.handleError);
	}

	getModel(model: string, id: string): Promise<any> {
		return this.http.get(`${this.apiUrl}/${model}/${id}`)
					.toPromise()
					.then(response => response.json())
					.catch(this.handleError);
	}

	update(model: string, id: string, data: any): Promise<any> {
		return this.http.post(
						`${this.apiUrl}/${model}/${id || ''}`,
						JSON.stringify(data),
						{ headers: this.headers }
					).toPromise()
					.then(response => response.json())
					.catch(this.handleError);
	}

	delete(model: string, id: string): Promise<any> {
		return this.http.delete(
						`${this.apiUrl}/${model}/${id}`,
						{headers: this.headers}
					).toPromise()
					.then(response => {
						let status = response.json()
						if (status.sucess !== 'deleted')
							return Promise.reject(`Deleted element error ${response}`);
						return status.__id
					}).catch(this.handleError);
	}
}
