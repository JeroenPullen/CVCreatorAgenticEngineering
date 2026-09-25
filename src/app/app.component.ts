import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CVCreator';

  onCreateCV(): void {
    alert('Create New CV button clicked!');
    console.log('Create New CV functionality triggered');
    // TODO: Implement CV creation functionality
  }

  onUploadCV(): void {
    alert('Upload CV button clicked!');
    console.log('Upload CV functionality triggered');
    // TODO: Implement CV upload functionality
  }
}

