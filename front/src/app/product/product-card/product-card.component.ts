import {Component, Input} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-product-card',
	standalone: true,
	imports: [
		NavigateDirective
	],
	templateUrl: './product-card.component.html',
})

export class ProductCardComponent {
	@Input() product: any;
}
