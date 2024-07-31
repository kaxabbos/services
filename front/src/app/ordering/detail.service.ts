import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class DetailService {
	detailSubject = new BehaviorSubject<any>({
		details: []
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

	getDetails() {
		return this.http.get(
			this.backendUrl + '/details',
			{headers: this.headersWithToken}
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
			this.backendUrl + `/details/${id}`,
			"",
			{
				headers: this.headersWithToken,
				params: new HttpParams().appendAll({count: count})
			}
		);
	}

	deleteDetail(id: any) {
		return this.http.delete(
			this.backendUrl + `/details/${id}`,
			{headers: this.headersWithToken}
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
