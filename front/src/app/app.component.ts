import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {NavComponent} from "./nav/nav.component";
import {AuthService} from "./auth/auth.service";
import {AlertComponent} from "./alert/alert.component";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		FooterComponent,
		NavComponent,
		AlertComponent,
	],
	templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
	constructor(
		private authService: AuthService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile();
	}

}
