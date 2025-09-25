import { Component } from '@angular/core';
import { captureView } from './utils/html-capture';
import { HttpClient } from '@angular/common/http';
import { routes } from './app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  routes = routes;
  constructor(private router: Router) {}
}
