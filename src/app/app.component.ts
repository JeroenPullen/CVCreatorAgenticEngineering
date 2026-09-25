import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  isDragging = false;
  answers = { strengths: '', experience: '', ambition: '' };
  interviewNotes = '';
  modalTitle = '';
  modalMessage = '';
  activeStep = 1;

  get answeredCount(): number {
    return Object.values(this.answers).filter(value => value.trim().length > 0).length;
  }

  get completedCount(): number {
    return Number(!!this.selectedFile) + Number(this.answeredCount === 3) + Number(!!this.interviewNotes.trim());
  }

  openFilePicker(): void {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.setFile(input.files?.[0]);
    input.value = '';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.setFile(event.dataTransfer?.files[0]);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  private setFile(file?: File): void {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.showPopup('PDF files only', 'Please select an existing CV in PDF format.');
      return;
    }
    this.selectedFile = file;
    this.showPopup('PDF added', `${file.name} is ready as a source for your CV draft.`);
  }

  removeFile(): void {
    this.selectedFile = null;
    this.showPopup('PDF removed', 'You can upload another PDF whenever you are ready.');
  }

  goToStep(step: number): void {
    this.activeStep = step;
    document.getElementById(`step-${step}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  generateCv(): void {
    if (this.completedCount < 3) {
      this.showPopup('Almost there', 'Add a PDF, answer all three questions and include interview notes before generating a CV.');
      return;
    }
    this.showPopup('CV generation is coming soon', 'Your inputs are ready. This is a page prototype: PDF reading and Harvest CV PDF export are not connected yet. No files or notes have been sent anywhere.');
  }

  showPopup(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
  }

  closePopup(): void {
    this.modalTitle = '';
    this.modalMessage = '';
  }
}
