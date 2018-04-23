import { Routes } from '@angular/router'

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MyordersComponent } from '../myorders/myorders.component'
import { TrainStationsComponent } from '../train-stations/train-stations.component'


export const routes : Routes = [
    {path : 'home' , component : HomeComponent},
    {path : 'menu/:trainNumber/:stCode' , component : MenuComponent},
    {path : 'about' , component : AboutComponent},
    {path: 'contactus', component: ContactComponent},
    {path : 'myorders' , component : MyordersComponent},
    {path : 'dishdetail/:id' , component : DishdetailComponent},
    {path : 'train/:trainNumber' , component : TrainStationsComponent},
    {path : '' , redirectTo : '/home' ,pathMatch : 'full'},
]