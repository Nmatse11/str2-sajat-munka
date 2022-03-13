import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/service/overlay.service';

@Component({
  selector: 'app-gamestart',
  templateUrl: './gamestart.component.html',
  styleUrls: ['./gamestart.component.scss']
})
export class GamestartComponent implements OnInit {

  isLoading: boolean = true

  constructor(
    private previewDialog: OverlayService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
        this.isLoading = false
        this.previewDialog.open()
    }, 1000)
  }

}
