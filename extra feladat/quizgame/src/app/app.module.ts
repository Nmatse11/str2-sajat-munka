import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgChartsModule } from 'ng2-charts';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

// Angular Material Components
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

// Cards
import { BaseCardComponent } from './common/card/base-card/base-card.component';
import { DisneyCardComponent } from './common/card/disney-card/disney-card.component';
import { MathCardComponent } from './common/card/math-card/math-card.component';
import { PoetryCardComponent } from './common/card/poetry-card/poetry-card.component';
import { MusicCardComponent } from './common/card/music-card/music-card.component';
import { MovieCardComponent } from './common/card/movie-card/movie-card.component';
import { HistoryCardComponent } from './common/card/history-card/history-card.component';
import { ImageCardComponent } from './common/card/image-card/image-card.component';
import { GrammarCardComponent } from './common/card/grammar-card/grammar-card.component';
import { FootballCardComponent } from './common/card/football-card/football-card.component';
import { FlagCardComponent } from './common/card/flag-card/flag-card.component';
import { GeographyCardComponent } from './common/card/geography-card/geography-card.component';

//Dialogs
import { ConfirmDialogComponent } from './common/dialog/confirm-dialog/confirm-dialog.component';
import { StartDialogComponent } from './common/dialog/start-dialog/start-dialog.component';
import { NewDialogComponent } from './common/dialog/new-dialog/new-dialog.component';
import { DeleteDialogComponent } from './common/dialog/delete-dialog/delete-dialog.component';
import { AdminDialogComponent } from './common/dialog/admin-dialog/admin-dialog.component';

//Pipes
import { TextoverflowPipe } from './pipe/textoverflow.pipe';
import { CustomNumberPipe } from './pipe/custom-number.pipe';

//Pages
import { HomeComponent } from './page/home/home.component';
import { GameComponent } from './page/game/game.component';
import { GamerulesComponent } from './page/gamerules/gamerules.component';
import { EditComponent } from './page/edit/edit.component';
import { QuizboardComponent } from './page/quizboard/quizboard.component';
import { ToplistComponent } from './page/toplist/toplist.component';
import { AdminComponent } from './page/admin/admin.component';

//Quiz
import { GameDataComponent } from './common/quiz/game-data/game-data.component';
import { QuestionComponent } from './common/quiz/question/question.component';
import { StartComponent } from './common/quiz/start/start.component';
import { QuizComponent } from './common/quiz/quiz/quiz.component';
import { ResultComponent } from './common/quiz/result/result.component';


//Charts
import { ChartsComponent } from './common/charts/charts/charts.component';
import { GamestartComponent } from './page/gamestart/gamestart.component';
import { GameendComponent } from './page/gameend/gameend.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    GameDataComponent,
    BaseCardComponent,
    DisneyCardComponent,
    MathCardComponent,
    PoetryCardComponent,
    MusicCardComponent,
    MovieCardComponent,
    HistoryCardComponent,
    GeographyCardComponent,
    ImageCardComponent,
    GrammarCardComponent,
    FootballCardComponent,
    FlagCardComponent,
    QuestionComponent,
    StartComponent,
    ConfirmDialogComponent,
    StartDialogComponent,
    GameComponent,
    QuizComponent,
    ResultComponent,
    CustomNumberPipe,
    QuizboardComponent,
    ToplistComponent,
    NewDialogComponent,
    AdminComponent,
    AdminDialogComponent,
    GamerulesComponent,
    TextoverflowPipe,
    EditComponent,
    DeleteDialogComponent,
    ChartsComponent,
    GamestartComponent,
    GameendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    NgxScrollTopModule,
    MatButtonModule,
    NgChartsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    OverlayModule
  ],
  providers: [],
  entryComponents: [
    ConfirmDialogComponent,
    StartDialogComponent,
    NewDialogComponent,
    AdminDialogComponent,
    DeleteDialogComponent,
    QuizboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
