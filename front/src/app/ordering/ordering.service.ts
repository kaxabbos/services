import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class OrderingService {

	orderingSubject = new BehaviorSubject<any>({
		orderings: [],
		details: []
	})


	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	getOrderings() {
		this.http.get(
			this.global.backendURL + '/orderings',
			{headers: this.global.getHeadersWithToken()}
		).subscribe({
			next: ((res: any) => {
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: res.data,
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	addOrdering(date: any) {
		this.http.post(
			this.global.backendURL + '/orderings',
			"",
			{
				headers: this.global.getHeadersWithToken(),
				params: new HttpParams().appendAll({
					date: date,
				})
			}
		).subscribe({
			next: ((res: any) => {
				this.getOrderings()
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	done(id: any) {
		this.http.get(
			this.global.backendURL + `/orderings/${id}/done`,
			{headers: this.global.getHeadersWithToken(),}
		).subscribe({
			next: ((res: any) => {
				let orderings = this.orderingSubject.value.orderings.map((i: any) => i.id === id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	delivery(id: any) {
		this.http.get(
			this.global.backendURL + `/orderings/${id}/delivery`,
			{headers: this.global.getHeadersWithToken(),}
		).subscribe({
			next: ((res: any) => {
				let orderings = this.orderingSubject.value.orderings.map((i: any) => i.id === id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	delivered(id: any) {
		this.http.get(
			this.global.backendURL + `/orderings/${id}/delivered`,
			{headers: this.global.getHeadersWithToken(),}
		).subscribe({
			next: ((res: any) => {
				let orderings = this.orderingSubject.value.orderings.map((i: any) => i.id === id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

}
