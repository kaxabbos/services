import {Component, Input} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {DecimalPipe, NgIf} from "@angular/common";
import {OrderingService} from "../ordering.service";

@Component({
	selector: 'app-ordering-card',
	standalone: true,
	imports: [
		DecimalPipe,
		NgIf
	],
	templateUrl: './ordering-card.component.html',
})

export class OrderingCardComponent {
	@Input() ordering: any;

	constructor(
		private authService: AuthService,
		private orderingService: OrderingService,
	) {
	}

	getRole() {
		return this.authService.getRole();
	}

	done() {
		this.orderingService.done(this.ordering.id);
	}

	delivery() {
		this.orderingService.delivery(this.ordering.id);
	}

	delivered() {
		this.orderingService.delivered(this.ordering.id);
	}
}
