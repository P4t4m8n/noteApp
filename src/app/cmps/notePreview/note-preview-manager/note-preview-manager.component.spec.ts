import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePreviewManagerComponent } from './note-preview-manager.component';

describe('NotePreviewManagerComponent', () => {
  let component: NotePreviewManagerComponent;
  let fixture: ComponentFixture<NotePreviewManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotePreviewManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotePreviewManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
