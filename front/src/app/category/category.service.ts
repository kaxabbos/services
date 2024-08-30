import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	categorySubject = new BehaviorSubject<any>({
		categories: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
	) {
	}

	findAll() {
		this.http.get(
			this.global.backendURL + '/categories',
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

	save(category: any) {
		let body = JSON.stringify(category);
		this.http.post(
			this.global.backendURL + '/categories',
			body,
			{headers: this.global.headersJsonToken},
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

	update(category: any) {
		return this.http.put(
			this.global.backendURL + `/categories/${category.id}`,
			category,
			{headers: this.global.headersJsonToken},
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
			this.global.backendURL + `/categories/${category.id}/img`,
			formData,
			{headers: this.global.headersMultipartToken},
		);
	}

	delete(id: any) {
		return this.http.delete(
			this.global.backendURL + `/categories/${id}`,
			{headers: this.global.headersJsonToken},
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
