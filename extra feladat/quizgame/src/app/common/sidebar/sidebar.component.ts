import { PlayerService } from 'src/app/service/player.service';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Player } from 'src/app/model/player';
import { NewDialogComponent } from '../dialog/new-dialog/new-dialog.component';
import { StartDialogComponent } from '../dialog/start-dialog/start-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  player: Player = new Player()

  autoClose!: boolean
  gameReady!: string

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private playerService: PlayerService,
    private dialog: MatDialog,
    private router: Router,
    private observer: BreakpointObserver,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //A játék gomb inaktív, ha nincs játékos
    this.gameReady = (!localStorage.getItem('game') ? 'disabled' : '')
  }

  //Sidebar elrejtése meghatározott töréspontnál
  //Automatikus bezárás kezelése
  ngAfterViewInit() {
    this.observer.observe(['(max-width: 992px)']).subscribe((res) => {
      if (res.matches) {
        this.autoClose = true
        this.close()
      } else {
        this.autoClose = false
        this.open()
      }
    });

    this.cd.detectChanges()
  }

  close() {
    this.sidenav.mode = 'over';
    this.sidenav.close();
  }

  open() {
    this.sidenav.mode = 'side';
    this.sidenav.open();
  }

  //Új játék indítása esetén biztonsági kérdés
  onRestart(): void {
    if (!localStorage.getItem('game')) {
      this.playerData()
    } else {
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
        localStorage.removeItem('admin')
        this.playerService.delete(1).subscribe(player => {
          player
          this.playerService.create(this.player).subscribe(player => this.player = player)
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/']);
              })
            })
        } else {(this.router.navigate(['/']))}
      })
    }
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

}
