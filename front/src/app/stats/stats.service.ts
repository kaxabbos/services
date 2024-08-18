import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	statsSubject = new BehaviorSubject<any>({
		categories: {},
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	getCategories() {
		this.http.get(
			this.global.backendURL + '/stats/categories',
			{headers: this.global.getHeadersWithToken()}
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
