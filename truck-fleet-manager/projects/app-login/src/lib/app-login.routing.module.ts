import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginHomeComponent } from "./login-home/login-home.component";
import { LoginFormComponent } from "./login-form/login-form.component";

const routes: Routes = [
    {
        path: '',
        component: LoginHomeComponent,
        children: [
            { path: '', component: LoginFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppLoginRoutingModule { }
