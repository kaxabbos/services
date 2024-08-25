import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class DetailService {
	detailSubject = new BehaviorSubject<any>({
		details: []
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	getDetails() {
		return this.http.get(
			this.global.backendURL + '/details',
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: ((res: any) => {
				this.detailSubject.next({
					...this.detailSubject.value,
					details: res.data,
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		});
	}

	updateDetail(id: any, count: any) {
		return this.http.patch(
			this.global.backendURL + `/details/${id}`,
			"",
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({count: count})
			}
		);
	}

	deleteDetail(id: any) {
		return this.http.delete(
			this.global.backendURL + `/details/${id}`,
			{headers: this.global.headersJsonToken}
		).subscribe({
			next: ((res) => {
				let current = this.detailSubject.value;
				let details = current.details.filter((i: any) => i.id !== id);
				this.detailSubject.next({
					...current,
					details: details
				})
			}),
			error: ((e) => {
				console.log('error', e);
			})
		});
	}
}
