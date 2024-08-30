import {Component, OnInit} from '@angular/core';
import {OrderingService} from "./ordering.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {DetailCardComponent} from "./detail-card/detail-card.component";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {DetailService} from "./detail.service";
import {FormsModule} from "@angular/forms";
import {OrderingCardComponent} from "./ordering-card/ordering-card.component";
import {GlobalService} from "../global.service";
import {EnumService} from "../enum.service";

@Component({
	selector: 'app-ordering',
	standalone: true,
	imports: [
		DetailCardComponent,
		NgIf,
		FormsModule,
		OrderingCardComponent,
		KeyValuePipe,
		NgForOf
	],
	templateUrl: './ordering.component.html',
})

export class OrderingComponent implements OnInit {

	details: any[] = []
	orderings: any[] = []

	date: any = null;

	orderingStatuses: any[] = [];
	filterDate: any = '';
	filterStatus: any = '0';


	constructor(
		private orderingService: OrderingService,
		private detailService: DetailService,
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private enumService: EnumService,
	) {
	}

	get sortedOrderings() {
		let res = this.orderings;

		res = res.filter(value => value.date.includes(this.filterDate));

		if (this.filterStatus !== '0') {
			res = res.filter(value => value.status === this.filterStatus);
		}

		res = res.sort((a, b) => (a.status < b.status ? 1 : -1));

		return res;
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.role !== 'USER' && this.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.orderingService.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.orderingService.getOrderings();

		if (this.role === 'USER') {
			this.detailService.detailSubject.subscribe(value => {
				this.details = value.details;
			})
			this.detailService.getDetails();
		}

		this.enumService.enumSubject.subscribe(value => {
			this.orderingStatuses = value.orderingStatuses;
			console.log(this.orderingStatuses);
		})
		this.enumService.getOrderingStatuses();

	}

	get role() {
		return this.global.role;
	}

	add() {
		this.orderingService.add(this.date);
		this.details = [];
	}
}
