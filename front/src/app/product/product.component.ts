import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductsService} from "./products.service";
import {AuthService} from "../auth/auth.service";
import {ProductCardComponent} from "./product-card/product-card.component";
import {NgIf} from "@angular/common";
import {CategoryService} from "../category/category.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
	selector: 'app-product',
	standalone: true,
	imports: [
		ProductCardComponent,
		NgIf,
		ReactiveFormsModule,
		FormsModule
	],
	templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
	products: any[] = []
	categories: any[] = []
	name = '';
	categoryId = 0;
	filter = 0;

	constructor(
		public router: Router,
		private productService: ProductsService,
		private authService: AuthService,
		private categoryService: CategoryService,
	) {
	}

	getProducts() {
		let res = this.products;

		res = res.filter(value => value.name.includes(this.name));

		if (this.categoryId != 0) {
			res = res.filter(value => value.categoryId == this.categoryId);
		}

		if (this.filter == 0) res = res.sort((a, b) => (a.id < b.id ? 1 : -1));
		else if (this.filter == 1) res = res.sort((a, b) => (a.id > b.id ? 1 : -1));
		else if (this.filter == 2) res = res.sort((a, b) => (a.price > b.price ? 1 : -1));
		else if (this.filter == 3) res = res.sort((a, b) => (a.price < b.price ? 1 : -1));
		else if (this.filter == 4) res = res.sort((a, b) => (a.name > b.name ? 1 : -1));
		else if (this.filter == 5) res = res.sort((a, b) => (a.name < b.name ? 1 : -1));

		return res;
	}

	ngOnInit(): void {
		this.authService.getUserProfile();

		this.productService.productSubject.subscribe(value => {
			this.products = value.products;
		})

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})

		this.productService.getProducts();
		this.categoryService.getCategories();
	}

	getRole() {
		return this.authService.getRole();
	}

}
