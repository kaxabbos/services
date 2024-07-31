import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	statsSubject = new BehaviorSubject<any>({
		categories: {},
	})
	private backendUrl = 'http://localhost:8080';
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
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
			this.backendUrl + '/stats/categories',
			{headers: this.headersWithToken}
		).subscribe({
			next: ((res: any) => {
				this.statsSubject.next({
					...this.statsSubject.value,
					categories: res.data,
				})
			}),
			error: ((e) => {
				console.log("error", e);
			})
		})
	}

}
