import { Component } from '@angular/core';
import { captureView } from './utils/html-capture';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-testing2';
  constructor(private http: HttpClient) {}
  createPDF() {
    const htmlString = captureView();
    this.sendInputToPdfServer(htmlString);
  }
  // sendInputToPdfServer(htmlString: string) {
  //   const blob = new Blob([htmlString]);
  //   const formData = new FormData();
  //   formData.append('file', blob, 'capture.html');

  //   fetch('http://localhost:3000/api/utils/pdf', {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Response:', data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }
  sendInputToPdfServer(htmlString: string) {
    const blob = new Blob([htmlString], { type: 'text/html' });
    const formData = new FormData();
    formData.append('file', blob, 'capture.html');

    this.http.post('http://localhost:3000/api/utils/pdf', formData).subscribe({
      next: (data) => {
        console.log('Response:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
