import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  panelOpenState = false;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
  //A játékos által eddig megszerzett pontok alakulása körönként
    this.playerService.getOne(1).subscribe(player => {
      this.barChartLabels = player.score.map(item => player.score.indexOf(item)+1)
      this.barChartData = [
        { data: player.score, label: 'egyenleg ', backgroundColor: '#ec4d4a',
        borderColor: 'rgb(255, 99, 132)', },
      ];
    })
  }

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels!: Number[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData!: any

}
