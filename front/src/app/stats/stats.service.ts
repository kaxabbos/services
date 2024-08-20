import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	getCategories() {
		return this.http.get(
			this.global.backendURL + '/stats/categories',
			{headers: this.global.getHeadersWithToken()}
		);
	}

}
