import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ClientListComponent } from './features/client-list/client-list.component';
import { ClientDetailComponent } from './features/client-detail/client-detail.component';
import { FileListComponent } from './features/file-list/file-list.component';
import { authGuard } from './core/auth.guard'
import { LoginComponent } from './features/login/login.component';
import { FileComponent } from './features/file/file.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // Rota de login sem proteção do guard
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'clientes', component: ClientListComponent },
            { path: 'cliente/:id', component: ClientDetailComponent },
            { path: 'cliente/:id/pasta/:folder_id', component: FileListComponent },
            { path: 'arquivos', component: FileComponent },
        ]
    },
    { path: '**', redirectTo: 'login' }
];