import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientListComponent } from './features/client-list/client-list.component';
import { ClientDetailComponent } from './features/client-detail/client-detail.component';
import { FileListComponent } from './features/file-list/file-list.component';
// import { AuthGuard } from './core/auth.guard'

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    //   { path: 'clientes', component: ClientListComponent, canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientListComponent },
    //   { path: 'cliente/:id', component: ClientDetailComponent, canActivate: [AuthGuard] },
    { path: 'cliente/:id', component: ClientDetailComponent },
    //   { path: 'cliente/:id/pasta/:folder_id', component: FileListComponent, canActivate: [AuthGuard] }
    { path: 'cliente/:id/pasta/:folder_id', component: FileListComponent }
];
