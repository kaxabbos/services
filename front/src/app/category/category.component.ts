import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {CategoryService} from "./category.service";
import {NgIf} from "@angular/common";
import {UserCardComponent} from "../user/user-card/user-card.component";
import {CategoryCardComponent} from "./category-card/category-card.component";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
	selector: 'app-category',
	standalone: true,
	imports: [
		NgIf,
		UserCardComponent,
		CategoryCardComponent,
		FormsModule,
		ReactiveFormsModule
	],
	templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
	categories: any[] = [];

	category = new FormGroup({
		name: new FormControl("", Validators.required),
	})
	message = "";

	constructor(
		private authService: AuthService,
		private categoryService: CategoryService,
		private router: Router,
	) {
	}

	getSortedCategories() {
		return this.categories.sort((a: any, b: any) => {
			if (a.id > b.id) return 1;
			if (a.id < b.id) return -1;
			return 0;
		});
	}

	ngOnInit(): void {
		this.authService.getUserProfile();
		if (this.authService.getRole() !== 'ADMIN') this.router.navigate(['/login'])
		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.getCategories();
	}

	addCategory() {
		this.categoryService.addCategory(this.category.value);
	}
}
