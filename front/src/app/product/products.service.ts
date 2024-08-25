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

	getProducts() {
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

	getProduct(id: any) {
		return this.http.get(
			this.global.backendURL + `/products/${id}`,
			{headers: this.global.headersToken}
		);
	}

	addProduct(product: any) {
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

	updateProduct(product: any, id: any) {
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

	updateImg(file: File, productId: any) {
		let formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.global.backendURL + `/products/${productId}/img`,
			formData,
			{
				headers: this.global.headersMultipartToken,
			}
		);
	}

	deleteProduct(productId: any) {
		return this.http.delete(
			this.global.backendURL + `/products/${productId}`,
			{headers: this.global.headersToken}
		);
	}
}
