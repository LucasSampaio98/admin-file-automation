import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClientService } from './client-list.service';


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: any[] = [];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  viewClientDetails(clientId: number, clientName: string): void {
    this.router.navigate(['/cliente', clientId], { queryParams: { clientName: clientName } });
  }
}
