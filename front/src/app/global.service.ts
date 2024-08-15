import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	getUserId() {
		return Number(localStorage.getItem('id')) || 0;
	}

	getRole() {
		return localStorage.getItem("role") || 'NOT';
	}

	getToken() {
		return localStorage.getItem("token") || '';
	}

	getBackendUrl() {
		return 'https://localhost:8080';
	}

	getHeadersWithToken() {
		return new HttpHeaders({
			'Authorization': 'Bearer ' + this.getToken(),
		});
	}

	getHeadersJsonWithToken() {
		return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + this.getToken(),
		});
	}

	getHeadersMultipartWithToken() {
		return new HttpHeaders({
			'enctype': 'multipart/form-data',
			'Authorization': 'Bearer ' + this.getToken(),
		});
	}
}
