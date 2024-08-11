import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isAdmin: boolean | string | null = false;
  @Input() isCollapsed: boolean = false;  // Recebe o estado da sidebar

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserRole() === 'admin';
  }
}
