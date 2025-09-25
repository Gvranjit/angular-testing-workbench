import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSnapshotAndPdfGenerationComponent } from './test-snapshot-and-pdf-generation.component';

describe('TestSnapshotAndPdfGenerationComponent', () => {
  let component: TestSnapshotAndPdfGenerationComponent;
  let fixture: ComponentFixture<TestSnapshotAndPdfGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSnapshotAndPdfGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSnapshotAndPdfGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
