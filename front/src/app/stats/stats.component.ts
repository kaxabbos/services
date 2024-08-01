import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";
import {StatsCategoryComponent} from "./stats-category/stats-category.component";
import {FormsModule} from "@angular/forms";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [
		NgApexchartsModule,
		NgIf,
		StatsCategoryComponent,
		NgClass,
		FormsModule
	],
	templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private router: Router,
	) {
	}

	ngOnInit(): void {
		this.authService.getUserProfile().add(() => {
			if (this.authService.getRole() !== 'ADMIN') this.router.navigate(['/login']);
		});

	}

	generatePDF() {
		let data: any = document.getElementById('generatePDF');
		html2canvas(data).then(canvas => {
			const contentDataURL = canvas.toDataURL('image/png')
			let pdf = new jsPDF(
				'p',
				'cm',
				'a4'
			);
			pdf.addImage(contentDataURL, 'PNG', 1, 1, 19, 0);
			pdf.save('pdf.pdf');
		});
	}

}
