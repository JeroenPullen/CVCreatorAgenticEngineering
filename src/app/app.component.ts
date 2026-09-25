import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CVCreator';
  apiKey = environment.apiKey;
  constructor(private readonly http: HttpClient) {}

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  isDragging = false;
  answers = { strengths: '', experience: '', ambition: '' };
  interviewNotes = '';
  modalTitle = '';
  modalMessage = '';
  activeStep = 1;
  draft: CvDraft | null = null;
  isGenerating = false;
  isDownloading = false;

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
    if (file.size > 5 * 1024 * 1024) {
      this.showPopup('PDF too large', 'Please choose a PDF smaller than 5 MB.');
      return;
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.showPopup('PDF files only', 'Please select an existing CV in PDF format.');
      return;
    }
    this.selectedFile = file;
    this.draft = null;
    this.showPopup('PDF added', `${file.name} is ready as a source for your CV draft.`);
  }

  removeFile(): void {
    this.selectedFile = null;
    this.draft = null;
    this.showPopup('PDF removed', 'You can upload another PDF whenever you are ready.');
  }

  goToStep(step: number): void {
    this.activeStep = step;
    document.getElementById(`step-${step}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  generateCv(): void {
    if (this.isGenerating || !this.selectedFile) return;
    if (this.completedCount < 3) {
      this.showPopup('Almost there', 'Add a PDF, answer all three questions and include interview notes before generating a CV.');
      return;
    }
    this.draft = null;
    this.isGenerating = true;
    const body = new FormData();
    body.append('cv', this.selectedFile);
    body.append('strengths', this.answers.strengths);
    body.append('experience', this.answers.experience);
    body.append('ambition', this.answers.ambition);
    body.append('notes', this.interviewNotes);
    this.http.post<{ draft: CvDraft }>('/api/cv/draft', body).subscribe({
      next: ({ draft }) => {
        this.draft = draft;
        this.isGenerating = false;
        this.goToStep(4);
        this.showPopup('Draft ready for review', 'Check every fact against the source CV and interview notes. Edit the draft before downloading the PDF.');
      },
      error: (error: HttpErrorResponse) => {
        this.isGenerating = false;
        this.showPopup('Could not generate CV', error.error?.error || 'The server is unavailable. Start the API server and try again.');
      }
    });
  }

  downloadPdf(): void {
    if (!this.draft || this.isDownloading) return;
    this.isDownloading = true;
    this.http.post('/api/cv/pdf', { draft: this.draft }, { responseType: 'blob' }).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Harvest-CV-${(this.draft?.name || 'draft').replace(/[^a-zA-Z0-9-]/g, '-')}.pdf`;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
        this.isDownloading = false;
      },
      error: () => {
        this.isDownloading = false;
        this.showPopup('Download failed', 'The PDF could not be created. Check the API server and try again.');
      }
    });
  }

  updateDraftList(key: string, value: string): void {
    if (!this.draft) return;
    const values = value.split('\n');
    if (key === 'education') this.draft.education = values;
    if (key === 'certifications') this.draft.certifications = values;
    if (key === 'languages') this.draft.languages = values;
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

interface CvDraft {
  name: string; headline: string; profile: string; skills: string[];
  experience: { role: string; organization: string; period: string; highlights: string[] }[];
  education: string[]; certifications: string[]; languages: string[]; reviewNotes: string[];
}
