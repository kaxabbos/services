import {Component, OnInit} from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {StatsService} from "../stats.service";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-stats-category',
	standalone: true,
	imports: [
		NgApexchartsModule,
		NgIf
	],
	templateUrl: './stats-category.component.html',
})
export class StatsCategoryComponent implements OnInit {

	public chartOptions: any;
	public data: any;

	constructor(
		private statsService: StatsService,
	) {
	}

	ngOnInit() {
		this.statsService.getCategories().subscribe({
			next: ((res: any) => {
				this.data = res.data
				this.updateChart();
			}),
			error: ((e) => {
				console.log("error", e);
			})
		})
	}

	updateChart() {
		this.chartOptions = {
			series: this.data.values,
			chart: {
				height: 500,
				type: "polarArea"
			},
			labels: this.data.names,
			stroke: {
				colors: ["#fff"]
			},
			fill: {
				opacity: 0.8
			},
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: "bottom"
						}
					}
				}
			]
		};
	}

}
