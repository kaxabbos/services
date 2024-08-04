import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";
import {OrderingService} from "../ordering.service";
import {GlobalService} from "../../global.service";

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
		private orderingService: OrderingService,
		private global: GlobalService,
	) {
	}

	getRole() {
		return this.global.getRole();
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
