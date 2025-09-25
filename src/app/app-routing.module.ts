import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { TestSnapshotAndPdfGenerationComponent } from './test-snapshot-and-pdf-generation/test-snapshot-and-pdf-generation.component';

export const routes: Routes = [
  {
    path: 'drag-and-drop',
    component: DragDropComponent,
    title: 'Drag and Drop',
  },
  {
    path: 'snapshot-and-pdf-generation',
    title: 'Snapshot and PDF Generation',
    component: TestSnapshotAndPdfGenerationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
