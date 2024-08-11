import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../client-list/client-list.service';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: any;
  clientName: string = '';
  folders: any[] = [];
  filesByFolder: { [key: number]: any[] } = {};  // Armazena os arquivos por pasta
  selectedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    this.route.queryParams.subscribe(params => {
      this.clientName = params['clientName'] || '';
    });

    this.clientService.getClientById(clientId).subscribe(client => {
      this.client = client;
      this.folders = client;
      this.loadFilesForFolders(clientId);
    });
  }

  loadFilesForFolders(clientId: number): void {
    this.folders.forEach(folder => {
      this.fileService.getFilesByFolderId(clientId, folder.id).subscribe(files => {
        this.filesByFolder[folder.id] = files;
      });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    this.fileService.uploadFiles(clientId, this.selectedFiles).subscribe(() => {
      this.loadFilesForFolders(clientId);  // Recarrega os arquivos após o upload
    });
  }
}
