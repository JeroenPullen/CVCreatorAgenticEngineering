import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CVCreator';
  apiKey = environment.apiKey;

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
