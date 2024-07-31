import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {DetailService} from "../detail.service";

@Component({
	selector: 'app-detail-card',
	standalone: true,
	imports: [
		FormsModule,
		DecimalPipe
	],
	templateUrl: './detail-card.component.html',
})

export class DetailCardComponent {
	@Input() detail: any;

	constructor(
		private router: Router,
		private detailService: DetailService,
	) {
	}

	price() {
		return this.detail.count * this.detail.productPrice;
	}

	productPage() {
		this.router.navigate(
			['/product'],
			{
				queryParams: {
					productId: this.detail.productId
				}
			}
		)
	}

	updateDetail() {
		this.detailService.updateDetail(this.detail.id, this.detail.count).subscribe({
			next: ((res: any) => {
				this.detail = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
			})
		})
	}

	deleteDetail() {
		this.detailService.deleteDetail(this.detail.id);
	}
}
