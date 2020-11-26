import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearComponent } from './tablero/crear/crear.component';
import { ListarComponent } from './tablero/listar/listar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http/';
import {AuthService} from './service/auth.service';
import {AuthGuard} from './guard/auth.guard';
import {TokenInterceptorService} from './service/token-interceptor.service';
import {TableroService} from './service/tablero.service';
import {MatExpansionModule} from '@angular/material/expansion';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    CrearComponent,
    ListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatExpansionModule
    
    
  ],
  providers: [AuthService,
    TableroService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
