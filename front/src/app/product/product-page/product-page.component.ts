import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../products.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../../global.service";

@Component({
	selector: 'app-product-page',
	standalone: true,
	imports: [
		NgIf,
		FormsModule
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
			if (this.getRole() === 'NOT') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(params => {
			this.id = params['productId'];
		});

		this.productService.getProduct(this.id).subscribe({
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

	getRole() {
		return this.global.getRole();
	}


	updatePage() {
		this.router.navigate(
			['/productUpdate'],
			{queryParams: {productId: this.id}}
		);
	}

	updateImg(event: any) {
		this.productService.updateImg(event.target.files[0], this.product.id).subscribe({
			next: ((res: any) => {
				this.product = res.data;
			}),
			error: ((e: any) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
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

	deleteProduct() {
		this.productService.deleteProduct(this.id).subscribe({
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
