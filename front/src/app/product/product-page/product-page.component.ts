import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../products.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-product-page',
	standalone: true,
	imports: [
		NgIf,
		FormsModule,
		NavigateDirective
	],
	templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
	id: any;
	product: any;
	message: any;
	count: any;

	constructor(
		public router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private productService: ProductsService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.role === 'NOT') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['id'];
		});

		this.productService.findById(this.id).subscribe({
			next: ((res: any) => {
				this.product = res.data;
			}),
			error: ((e) => {
				console.log("error", e);
				if (e.error.code === 404) {
					this.router.navigate(
						['/error'],
						{
							queryParams: {
								message: e.error.code + ' : ' + e.error.message,
							}
						}
					);
				} else {
					this.router.navigate(['/login']);
				}
			})
		});
	}

	get role() {
		return this.global.role;
	}

	detail() {
		this.productService.detail(this.id, this.count).subscribe({
			next: (() => {
				this.message = 'Успешно добавлено к заказу';
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	delete() {
		this.productService.delete(this.id).subscribe({
			next: (() => {
				this.router.navigate(['/products']);
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}
}
