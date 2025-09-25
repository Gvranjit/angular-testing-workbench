import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { captureView } from '../utils/html-capture';

@Component({
  selector: 'app-test-snapshot-and-pdf-generation',
  standalone: false,

  templateUrl: './test-snapshot-and-pdf-generation.component.html',
  styleUrl: './test-snapshot-and-pdf-generation.component.scss',
})
export class TestSnapshotAndPdfGenerationComponent {
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

    this.http.post('http://localhost:3000/api/html2pdf', formData).subscribe({
      next: (data) => {
        console.log('Response:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
