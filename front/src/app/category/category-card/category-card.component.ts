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

	update() {
		this.categoryService.update(this.category);
	}

	delete() {
		this.categoryService.delete(this.category.id);
	}
}
