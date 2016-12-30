import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class FileService {
	upload(type: string = null, blob: Blob): Promise<any> {
		return new Promise( (resolve, reject) => {
			if (!blob)
				throw new TypeError('blob not set')

			let xhr: XMLHttpRequest = new XMLHttpRequest()
			xhr.open('POST', '/file/' + type, true)
			xhr.addEventListener('readystatechange', () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200)
						resolve(JSON.parse(xhr.response))
					else
						reject(xhr.response)
				}
			})
			xhr.send(blob)
		})
	}

	uploadImage(file: File = null): Promise<any> {
		return new Promise( (resolve, reject) => {
			if (!file)
				return reject(new TypeError('file not set'))

			let fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				let img = new Image()
				img.addEventListener('load', () => {
					let cnv = document.createElement('canvas')
					cnv.width = img.naturalWidth
					cnv.height = img.naturalHeight
					let ctx = cnv.getContext('2d')
					ctx.scale(1, 1)
					ctx.drawImage(img, 0, 0)
					let dataurl = cnv.toDataURL('image/jpeg', 0.92)
					let bstr = atob(dataurl.split(',')[1])
					let n = bstr.length
					let u8arr = new Uint8Array(n)
					while(n--)
						u8arr[n] = bstr.charCodeAt(n)
					this.upload('jpg', new Blob([u8arr], { type:'image/jpeg' })).then(response => resolve(response))
				}, false)
				img.addEventListener('error', () => reject(new Error('Convert image error')), false)
				img.src = fileReader.result
			})
			fileReader.readAsDataURL(file)
		})
	}

	uploadPdf(file: File = null): Promise<any> {
		return new Promise( (resolve, reject) => {
			if (!file)
				return reject(new TypeError('file not set'))

			let fileReader = new FileReader()
			fileReader.addEventListener('load', () => {
				let dataurl = fileReader.result
				let bstr = atob(dataurl.split(',')[1])
				let n = bstr.length
				let u8arr = new Uint8Array(n)
				while(n--)
					u8arr[n] = bstr.charCodeAt(n)
				this.upload('pdf', new Blob([u8arr], { type:'application/pdf' })).then(response => resolve(response))
			})
			fileReader.readAsDataURL(file)
		})
	}
}
