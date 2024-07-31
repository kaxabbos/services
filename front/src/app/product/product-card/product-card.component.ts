import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [],
	templateUrl: './product-card.component.html',
})

export class ProductCardComponent {
	@Input() product: any;

	constructor(
		private router: Router,
	) {
	}

	productPage() {
		this.router.navigate(
			['/product'],
			{queryParams: {productId: this.product.id}}
		);
	}
}
