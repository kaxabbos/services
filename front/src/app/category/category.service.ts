import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	categorySubject = new BehaviorSubject<any>({
		categories: [],
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

	getCategories() {
		this.http.get(
			this.backendUrl + '/categories',
			{headers: this.headers},
		).subscribe({
			next: ((res: any) => {
				this.categorySubject.next({
					...this.categorySubject.value,
					categories: res.data,
				})
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		});
	}

	addCategory(category: any) {
		let body = JSON.stringify(category);
		this.http.post(
			this.backendUrl + '/categories',
			body,
			{headers: this.headersWithToken},
		).subscribe({
			next: ((res: any) => {
				this.categorySubject.next({
					...this.categorySubject.value,
					categories: [...this.categorySubject.value.categories, res.data],
				})
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		});
	}

	updateCategory(category: any) {
		return this.http.put(
			this.backendUrl + `/categories/${category.id}`,
			category,
			{headers: this.headersWithToken},
		).subscribe({
			next: ((res: any) => {
				const current = this.categorySubject.value;
				const categories = current.categories.map((item: any) => item.id === category.id ? res.data : item);
				this.categorySubject.next({
					...current,
					categories: categories
				})
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		});
	}

	updateImg(file: File, category: any) {
		const formData = new FormData();
		formData.append('file', file, file.name);
		return this.http.patch(
			this.backendUrl + `/categories/${category.id}/img`,
			formData,
			{headers: this.headersMultipartWithToken},
		);
	}

	deleteCategory(id: any) {
		return this.http.delete(
			this.backendUrl + `/categories/${id}`,
			{headers: this.headersWithToken},
		).subscribe({
			next: ((res: any) => {
				const current = this.categorySubject.value;
				const categories = current.categories.filter((i: any) => i.id !== id);
				this.categorySubject.next({
					...current,
					categories: categories
				})
			}),
			error: ((error: any) => {
				console.log("error", error);
			})
		});
	}


}
