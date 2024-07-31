import {Component, Input} from '@angular/core';
import {CategoryService} from "../category.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CategoryComponent} from "../category.component";

@Component({
	selector: 'app-category-card',
	standalone: true,
	imports: [
		FormsModule,
		NgIf
	],
	templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
	@Input() category: any;

	constructor(
		private categoryService: CategoryService,
		private categoryComponent: CategoryComponent,
	) {
	}

	updateCategory() {
		this.categoryService.updateCategory(this.category);
	}

	updateImg(event: any) {
		this.categoryService.updateImg(event.target.files[0], this.category).subscribe({
			next: ((res: any) => {
				this.category = res.data;
			}),
			error: ((error: any) => {
				console.log("error", error);
				this.categoryComponent.message = error.error.message;
			})
		});
	}


	deleteCategory() {
		this.categoryService.deleteCategory(this.category.id);
	}
}
