import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { Model } from '../common/model'
import { UUID } from '../common/uuid'

@Injectable()
export class APIService {
	private static apiRoot = '/api/object/'

	private static options = new RequestOptions({
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})

	private static handleError (error: any) {
		let msg = error.message || error.status && `${error.status} - ${error.statusText}` || 'Server error'
		console.error(msg)
		return Promise.reject(new Error(msg))
	}

	private static getAPIurl(api:string = '', item: UUID | Model | string = null): string {
		let id = item instanceof Model && item.__id.toString() ||
				 item instanceof UUID && item.toString() ||
				 item && new UUID(String(item)).toString() ||
				 ''
		return `${APIService.apiRoot}/${api}/${id}`.replace(/\/\//,'/')
	}

	constructor(private http: Http) {}

	get<T extends Model>( model: { new(value: any): T, __api: string },
						  item: UUID | Model | string = null
						) : Promise<T | T[] | Error> {
		let api = APIService.getAPIurl(model.__api, item)
		return this.http.get(api)
						.toPromise()
						.then(response => response.json() || null)
						.then(value => value && value || Promise.reject({ message: 'Response is empty' }) )
						.then(value => {
							if (value instanceof Array)
								return value.map( (value:any) => new model(value))
							return new model(value)
						})
						.catch(APIService.handleError)
	}

	update<T extends Model>( model: { new(value: any): T, __api: string },
							 item: Model
						) : Promise<T | Error> {
		let api = APIService.getAPIurl(model.__api, item)
		return this.http.post(api, item.toString(), APIService.options)
						.toPromise()
						.then(response => response.json() || null)
						.then(value => value && value || Promise.reject({ message: 'Response is empty' }) )
						.then(value => new model(value))
						.catch(APIService.handleError)

	}

	delete<T extends Model>( model: { new(value: any): T, __api: string },
							 item: Model
						) : Promise<void | Error> {
		let api = APIService.getAPIurl(model.__api, item)
		return this.http.delete(api, APIService.options)
						.toPromise()
						.then(response => response.json() || null)
						.then(value => value && value || Promise.reject({ message: 'Response is empty' }) )
						.then(value => (value.sucess !== 'deleted' || value.__id !== item.__id.toString()) && Promise.reject(value) || void 0)
						.catch(APIService.handleError)
	}
}
