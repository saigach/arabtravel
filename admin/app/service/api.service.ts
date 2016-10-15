import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Model } from '../common/model'

import { UUID } from '../common/uuid'

@Injectable()
export class APIService {
	private static apiRoot = '/api/object/'

	private options = new RequestOptions({
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})

	private handleError (error: any) {
		let errMsg = (error.message) ?
			error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
		console.error(errMsg)
		return Promise.reject(errMsg)
	}

	constructor(private http: Http) {}

	get<T extends Model>(model: {new(): T}, id: UUID): T {
		let api = (<typeof Model> model.constructor).__api
		console.log(api)
		return new model()
	}

	// get<T>(v: any): T {
	// 	return new <T>(v)
	// }

	// get<T>(id: UUID): Promise<any> {
	// 	return this.http.get(T.apiPath + (id ? id.toString() : ''))
	// 					.toPromise()
	// 					.then(response => response.json() || {})
	// 					.catch(this.handleError)
	// }


	// get(id: UUID): Promise<any> {
	// 	return this.http.get(this.apiPath + (id ? id.toString() : ''))
	// 					.toPromise()
	// 					.then(response => response.json() || {})
	// 					.catch(this.handleError)
	// }

	// update(data: any): Promise<any> {
	// 	return this.http.post(this.apiPath, data.toJSON(), this.options)
	// 					.toPromise()
	// 					.then(response => response.json() || {})
	// 					.catch(this.handleError)
	// }

	// delete(id: UUID): Promise<any> {
	// 	if (!id)
	// 		return Promise.reject(new TypeError('id not set'))
	// 	return this.http.delete(.apiRoot + id.toString(), this.options)
	// 					.toPromise()
	// 					.then(response => response.json() || {})
	// 					.then(response => {
	// 						if (response.sucess !== 'deleted' || response.__id !== id.toString())
	// 							return Promise.reject(response)
	// 						return Promise.resolve(response.__id)
	// 					})
	// 					.catch(this.handleError)
	// }
}
