import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {DetailService} from "../detail.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-detail-card',
	standalone: true,
	imports: [
		FormsModule,
		DecimalPipe,
		NavigateDirective
	],
	templateUrl: './detail-card.component.html',
})

export class DetailCardComponent {
	@Input() detail: any;

	constructor(
		private detailService: DetailService,
	) {
	}

	price() {
		return this.detail.count * this.detail.productPrice;
	}

	update() {
		this.detailService.update(this.detail.id, this.detail.count).subscribe({
			next: ((res: any) => {
				this.detail = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
			})
		})
	}

	delete() {
		this.detailService.delete(this.detail.id);
	}
}
