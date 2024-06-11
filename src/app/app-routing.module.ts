import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { SignComponent } from './sign/sign.component';
import { ProductsComponent } from './products/products.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'item', component: ItemComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'LogIn', component: SignComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'cart', component: CartComponent},
  {path: 'path', component: CartComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
