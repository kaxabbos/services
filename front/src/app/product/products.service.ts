import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class ProductsService {

	productSubject = new BehaviorSubject<any>({
		products: [],
	})
	private backendUrl = 'http://localhost:8080';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});
	private headersMultipartWithToken = new HttpHeaders({
		'enctype': 'multipart/form-data',
		'Authorization': 'Bearer ' + localStorage.getItem("token"),
	});
	private headersWithToken = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem("token"),
	});

	constructor(
		private http: HttpClient
	) {
	}

	detail(id: any, count: any) {
		return this.http.post(
			this.backendUrl + `/products/${id}/detail`,
			"",
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({count: count})
			},
		);
	}

	getProducts() {
		this.http.get(
			this.backendUrl + '/products',
			{headers: this.headers}
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
			this.backendUrl + `/products/${id}`,
			{headers: this.headersWithToken}
		);
	}

	addProduct(product: any) {
		let body = JSON.stringify(product);
		return this.http.post(
			this.backendUrl + '/products',
			body,
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({
					categoryId: product.categoryId,
				})
			}
		);
	}

	updateProduct(product: any, id: any) {
		let body = JSON.stringify(product);
		return this.http.put(
			this.backendUrl + `/products/${id}`,
			body,
			{
				headers: this.headersWithToken,
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
			this.backendUrl + `/products/${productId}/img`,
			formData,
			{
				headers: this.headersMultipartWithToken,
			}
		);
	}

	deleteProduct(productId: any) {
		return this.http.delete(
			this.backendUrl + `/products/${productId}`,
			{headers: this.headersMultipartWithToken}
		);
	}
}
