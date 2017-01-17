import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import { MLString } from '../../model/common'

@Injectable()
export class MLService {
	private static mlPath = '/multilang.json'

	private static options = new RequestOptions({
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})

	constructor(private http: Http) {}

	get(): Promise<{ [key:string]: MLString }> {
		return this.http.get(MLService.mlPath)
				.toPromise()
				.then(response => response.json() || {})
				.then(response => {
					let data = {}

					for(let key in response)
						data[key] = new MLString(response[key])

					return data
				})
	}
}
