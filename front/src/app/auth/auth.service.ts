import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private global: GlobalService,
	) {
	}

	login(user: any) {
		return this.http.post<any>(
			this.global.getBackendUrl() + '/users/login',
			"",
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)
				}
			}
		)
	}

	reg(user: any) {
		return this.http.post<any>(
			this.global.getBackendUrl() + '/users',
			user,
			{headers: this.global.getHeaders()}
		)
	}

	getUserProfile() {
		return this.http.get<any>(
			this.global.getBackendUrl() + '/users/profile',
			{headers: this.global.getHeadersWithToken()}
		).subscribe({
			next: ((res) => {
			}),
			error: ((error) => {
				localStorage.clear();
			})
		});
	}

	getId() {
		return localStorage.getItem('id') !== null ? Number(localStorage.getItem('id')) : 0;
	}

	getRole() {
		return localStorage.getItem("role") !== null ? localStorage.getItem("role") : 'NOT';
	}

	logout() {
		localStorage.clear();
		this.router.navigate(['/login'])
	}
}
