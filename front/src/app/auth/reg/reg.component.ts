import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
	selector: 'app-reg',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './reg.component.html',
})
export class RegComponent {

	message = "";

	regForm = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private authService: AuthService,
		private router: Router
	) {
	}

	regFormSubmit() {
		this.authService.reg(this.regForm.value).subscribe({
			next: ((resReg) => {
				this.authService.login(this.regForm.value).subscribe({
					next: ((resLogin) => {
						localStorage.setItem("id", resLogin.data.user.id);
						localStorage.setItem("role", resLogin.data.user.role);
						localStorage.setItem("token", resLogin.data.token);

						this.router.navigate(['/']);
					}),
					error: ((error) => {
						console.log("error", error);
						if (error.status === 0) this.message = "Сервер не работает";
						else this.message = error.error.message;
					})
				});

			}),
			error: ((error) => {
				console.log("error", error);
				if (error.status === 0) this.message = "Сервер не работает";
				else this.message = error.error.message;
			})
		});
	}

}
