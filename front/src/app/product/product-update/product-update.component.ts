import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
	selector: 'app-product-update',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgForOf,
		NgIf
	],
	templateUrl: './product-update.component.html',
})

export class ProductUpdateComponent implements OnInit {
	productFormGroup = new FormGroup({
		name: new FormControl("", Validators.required),
		price: new FormControl("", [Validators.required, Validators.min(0.01)]),
		description: new FormControl("", Validators.required),
		categoryId: new FormControl("", Validators.required),
	});

	categories: any[] = [];
	message: any;
	id: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService,
		private productService: ProductsService,
		private categoryService: CategoryService,
	) {
	}

	ngOnInit(): void {
		if (this.authService.getRole() !== 'MANAGER') this.router.navigate(['/login']);

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['productId'];
		})

		this.productService.getProduct(this.id).subscribe({
			next: ((res: any) => {
				this.productFormGroup.setValue({
					name: res.data.name,
					price: res.data.price,
					description: res.data.description,
					categoryId: res.data.categoryId,
				})
			}),
			error: ((e) => {
				console.log("error", e);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: e.error.code + ' : ' + e.error.message,
						}
					}
				);
			})
		});

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.getCategories();
	}

	updateProduct() {
		this.productService.updateProduct(this.productFormGroup.value, this.id).subscribe({
			next: ((res: any) => {
				this.router.navigate(
					['/product'],
					{queryParams: {productId: res.data.id}}
				);
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	getProductPage() {
		this.router.navigate(
			['/product'],
			{queryParams: {productId: this.id}}
		);
	}
}
