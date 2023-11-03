import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginHomeComponent } from "./login-home/login-home.component";
import { adminGuard } from "projects/common/src";


const routes: Routes = [
    { path: '', component: LoginHomeComponent, canActivate: [adminGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLoginRoutingModule { }
