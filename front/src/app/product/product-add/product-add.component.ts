import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {GlobalService} from "../../global.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-product-add',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		NgForOf,
		NgIf,
		NavigateDirective
	],
	templateUrl: './product-add.component.html',
})

export class ProductAddComponent implements OnInit {
	productFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl("", [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		categoryId: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	});
	file:any = null;

	categories: any[] = [];
	message: any;

	constructor(
		private router: Router,
		private authService: AuthService,
		private productService: ProductsService,
		private categoryService: CategoryService,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})

		this.categoryService.findAll();
	}

	save() {
		this.productService.save(this.productFormGroup.value).subscribe({
			next: ((res: any) => {
				this.productService.updateImg(this.file, res.data.id).subscribe({
					next: (() => {
						this.router.navigate(
							['/product'],
							{queryParams: {id: res.data.id}}
						);
					}),
					error: ((e: any) => {
						console.log("error", e);
						this.message = e.error.message;
					})
				})
			}),
			error: ((e) => {
				console.log("error", e);
				this.message = e.error.message;
			})
		})
	}

	updateImg(event: any) {
		this.file = event.target.files[0];
	}
}
