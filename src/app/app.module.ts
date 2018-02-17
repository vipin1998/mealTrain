import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,MatNativeDateModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,MatSidenavModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { baseURL , mongoURL } from './shared/baseurl'
import { HttpModule } from '@angular/http';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import 'hammerjs';

import { RestangularModule ,Restangular} from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig'

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import {LeaderService} from './services/leader.service'
import { ProcessHttpmsgService } from './services/process-httpmsg.service'

import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { HighlightDirective } from './directives/highlight.directive';
import { MyordersComponent } from './myorders/myorders.component';
import { SearchFoodComponent } from './search-food/search-food.component';
import { TrainStationsComponent } from './train-stations/train-stations.component';
import { TrainService } from './services/train.service';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './services/user.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/user.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    MyordersComponent,
    SearchFoodComponent,
    TrainStationsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule ,
    HttpClientModule,

    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,MatNativeDateModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,MatSidenavModule,

    AppRoutingModule,
    RestangularModule.forRoot(RestangularConfigFactory)

  ],
  providers: [ DishService,PromotionService,LeaderService,ProcessHttpmsgService ,TrainService,UserService,HttpClientModule,
      { provide : 'MongoURL' ,useValue : mongoURL},
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: UnauthorizedInterceptor,
        multi: true
      }
    ],
  entryComponents : [LoginComponent,SignupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }