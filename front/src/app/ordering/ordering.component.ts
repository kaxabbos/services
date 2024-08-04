import {Component, OnInit} from '@angular/core';
import {OrderingService} from "./ordering.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {DetailCardComponent} from "./detail-card/detail-card.component";
import {NgIf} from "@angular/common";
import {DetailService} from "./detail.service";
import {FormsModule} from "@angular/forms";
import {OrderingCardComponent} from "./ordering-card/ordering-card.component";
import {GlobalService} from "../global.service";

@Component({
	selector: 'app-ordering',
	standalone: true,
	imports: [
		DetailCardComponent,
		NgIf,
		FormsModule,
		OrderingCardComponent
	],
	templateUrl: './ordering.component.html',
})

export class OrderingComponent implements OnInit {

	details: any[] = []
	orderings: any[] = []
	date: any = null;

	constructor(
		private orderingService: OrderingService,
		private detailService: DetailService,
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
	) {
	}

	getSortedOrderings() {
		return this.orderings.sort((a: any, b: any) => {
			if (a.status > b.status) return -1;
			if (a.status < b.status) return 1;
			return 0;
		});
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.getRole() !== 'USER' && this.getRole() !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.orderingService.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.orderingService.getOrderings();

		if (this.getRole() === 'USER') {
			this.detailService.detailSubject.subscribe(value => {
				this.details = value.details;
			})
			this.detailService.getDetails();
		}

	}

	getRole() {
		return this.global.getRole();
	}

	orderingAdd() {
		this.orderingService.addOrdering(this.date);
		this.details = [];
	}
}
