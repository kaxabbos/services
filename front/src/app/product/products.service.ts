import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class ProductsService {

	productSubject = new BehaviorSubject<any>({
		products: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	detail(id: any, count: any) {
		return this.http.post(
			this.global.backendURL + `/products/${id}/detail`,
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({count: count})
			},
		);
	}

	findAll() {
		this.http.get(
			this.global.backendURL + '/products',
		).subscribe({
			next: ((res: any) => {
				this.productSubject.next({
					...this.productSubject.value,
					products: res.data,
				})
			}),
			error: (e: any) => {
				console.log("error", e);
			}
		});
	}

	findById(id: any) {
		return this.http.get(
			this.global.backendURL + `/products/${id}`,
			{headers: this.global.headersToken}
		);
	}

	save(product: any) {
		let body = JSON.stringify(product);
		return this.http.post(
			this.global.backendURL + '/products',
			body,
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: product.categoryId,
				})
			}
		);
	}

	update(product: any, id: any) {
		let body = JSON.stringify(product);
		return this.http.put(
			this.global.backendURL + `/products/${id}`,
			body,
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({
					categoryId: product.categoryId,
				})
			}
		);
	}

	updateImg(file: File, id: any) {
		let formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.global.backendURL + `/products/${id}/img`,
			formData,
			{
				headers: this.global.headersMultipartToken,
			}
		);
	}

	delete(id: any) {
		return this.http.delete(
			this.global.backendURL + `/products/${id}`,
			{headers: this.global.headersToken}
		);
	}
}
