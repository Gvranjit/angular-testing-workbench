import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { captureView } from '../utils/html-capture';

@Component({
  selector: 'app-parent',
  standalone: false,

  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  ngAfterViewInit() {
    const htmlString = captureView();
    this.sendInputToServer(htmlString);
  }

  sendInputToServer(htmlString: string) {
    this.http
      .post('http://localhost:8081/saveHtml', { text: htmlString })
      .subscribe({
        next: (response) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }
}
