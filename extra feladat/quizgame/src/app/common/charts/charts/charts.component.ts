import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  @Input() player!: Player
  panelOpenState = false;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
  //A játékos által eddig megszerzett pontok alakulása körönként
      this.barChartLabels = this.player.score.map(item => this.player.score.indexOf(item)+1)
      this.barChartData = [
        { data: this.player.score, label: 'egyenleg ', backgroundColor: '#ec4d4a',
        borderColor: 'rgb(255, 99, 132)', },
      ];
  }

  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels!: Number[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData!: any

}
