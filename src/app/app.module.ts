import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/signup/signup.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { BoardComponent } from './components/board/board.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { LobbyComponent } from './views/lobby/lobby.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WinComponent } from './components/dialogs/win/win.component';
import { DrawComponent } from './components/dialogs/draw/draw.component';
import { LoserComponent } from './components/dialogs/loser/loser.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    WelcomeComponent,
    BoardComponent,
    LobbyComponent,
    WinComponent,
    DrawComponent,
    LoserComponent,
    
  ],
  entryComponents: [WinComponent, DrawComponent, LoserComponent],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
