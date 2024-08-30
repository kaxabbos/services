import {Component, Input} from '@angular/core';
import {DecimalPipe, NgIf} from "@angular/common";
import {OrderingService} from "../ordering.service";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-ordering-card',
	standalone: true,
	imports: [
		DecimalPipe,
		NgIf,
		NavigateDirective
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

	get role() {
		return this.global.role;
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
