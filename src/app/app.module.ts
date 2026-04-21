import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DragPreviewComponent } from './drag-drop/drag-preview/drag-preview.component';
import { TestSnapshotAndPdfGenerationComponent } from './test-snapshot-and-pdf-generation/test-snapshot-and-pdf-generation.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    ChildComponent,
    EditorComponent,
    DragDropComponent,
    // drag preview helper is a standalone component and is imported below
    TestSnapshotAndPdfGenerationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CKEditorModule,
    DragDropModule,
    DragPreviewComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
