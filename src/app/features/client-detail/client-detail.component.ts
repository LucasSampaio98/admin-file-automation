import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientService } from '../client-list/client-list.service';
import { FileService } from '../services/file.service';
import { FolderService } from '../services/folder.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../core/success-dialog.component';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MatDialogModule, SuccessDialogComponent],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: any;
  folders: any[] = [];
  availableFormats: any[] = [];  // Formatos disponíveis
  filesByFolder: { [key: number]: any[] } = {};  // Armazena os arquivos por pasta
  selectedFiles: File[] = [];
  selectedFolderIds: number[] = []; // Agora isso armazena IDs de pastas
  selectedFormats: string[] = []; // Para o modo 2 (novas pastas baseadas em formatos)
  mode: 'single' | 'multiple' = 'single'; // Para os radio buttons

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private fileService: FileService,
    private folderService: FolderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    const clientName = this.route.snapshot.queryParamMap.get('clientName')!;
    this.client = { name: clientName };
    this.clientService.getClientById(clientId).subscribe(client => {
      this.folders = client;
      // this.loadFilesForFolders(clientId);
    });
    this.loadAvailableFormats(clientId);
  }

  toggleModes(): void {
    // Limpa as seleções quando o modo é trocado
    this.selectedFolderIds = [];
    this.selectedFormats = [];
    this.selectedFiles = [];
  }

  loadFilesForFolders(clientId: number): void {
    this.folders.forEach(folder => {
      this.fileService.getFilesByFolderId(clientId, folder.id).subscribe(files => {
        this.filesByFolder[folder.id] = files;
      });
    });
  }

  onFolderSelectionChange(event: any): void {
    const folderId = +event.target.value;
    if (event.target.checked) {
      this.selectedFolderIds.push(folderId);
    } else {
      this.selectedFolderIds = this.selectedFolderIds.filter(id => id !== folderId);
    }
  }

  onFormatSelectionChange(event: any): void {
    const formatName = event.target.value;
    if (event.target.checked) {
      this.selectedFormats.push(formatName);
    } else {
      this.selectedFormats = this.selectedFormats.filter(f => f !== formatName);
    }
  }

  loadAvailableFormats(clientId: number): void {
    this.clientService.getAvailableFormats(clientId).subscribe(formats => {
      this.availableFormats = formats;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;

    if (this.mode === 'single') {
      // Envia para pastas específicas usando IDs das pastas
      this.folderService.uploadToSelectedFolders(clientId, this.selectedFolderIds, this.selectedFiles).subscribe(() => {
        this.openSuccessDialog("Arquivos enviados com sucesso!");
      });
    }
  }

  createFolders(): void {
    const clientId = +this.route.snapshot.paramMap.get('id')!;

    if (this.mode === 'multiple') {
      // Envia para novas pastas baseadas em formatos
      this.folderService.createAndUploadToFolders(clientId, this.selectedFormats, this.selectedFiles).subscribe(() => {
        this.openSuccessDialog("Pastas criadas e arquivos enviados com sucesso!");
      });
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: { message: message }
    });
  }
}
