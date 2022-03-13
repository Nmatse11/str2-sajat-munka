import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { PlayerService } from 'src/app/service/player.service';
import { NewDialogComponent } from '../dialog/new-dialog/new-dialog.component';
import { StartDialogComponent } from '../dialog/start-dialog/start-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  player: Player = new Player()

  tooltip!: string
  tooltipdisabled!: boolean
  routerLink!: string

  constructor(
    private playerService: PlayerService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //Játék link átírása, ha nincs játékos
    this.tooltip = 'Először új játékot kell indítanod!'
    this.tooltipdisabled = (!localStorage.getItem('game')) ? false : true
    this.routerLink = (!localStorage.getItem('game')) ? '/' : '/gameboard'
  }

  //Új játék indítása esetén biztonsági kérdés
  onRestart(): void {
    const confirmDialog = this.dialog.open(NewDialogComponent, {
      data: {
        title: 'Megerősítés',
        message1: 'Biztos vagy benne, hogy új játékot szeretnél kezdni?',
        message2: 'Ha rákattintasz az Igen-re, akkor minden eddig adat és pont elveszik.'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.removeItem('game')
        this.playerService.delete(1)
        this.playerService.create(this.player)
        this.playerData()
        } else {(this.router.navigate(['/']))}
      })
  }

  //Új játék indítása
  playerData() {
    const startDialog = this.dialog.open(StartDialogComponent, {
      data: {
        title: 'Kezdődhet a játék?'
      }
    });
    startDialog.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.setItem('game', 'on')
        this.router.navigate(['/', 'gameboard'])
        } else {(this.router.navigate(['/']))}
    })
  }

  /*
  <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
  <div class="container-fluid">
    <div class="navbar-wrapper">
    </div>
    <button class="navbar-toggler border border-1 mr-4" type="button" data-toggle="collapse" data-target="#mainMenu"
      aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation">
      <i class="material-icons">dehaze</i>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="mainMenu">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="#scrollDownload"
            class="h5 small start smooth button text-decoration-none text-uppercase mr-md-4">Download</a>
        </li>
        <li class="nav-item">
          <a href="#scrollFeatures"
            class="h5 small start smooth button text-decoration-none text-uppercase mr-md-4">Features</a>
        </li>
        <li class="nav-item">
        <li class="nav-item text-md-center">
          <a href="#scrollContact" class="h5 small start smooth button text-decoration-none text-uppercase">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  */

}
