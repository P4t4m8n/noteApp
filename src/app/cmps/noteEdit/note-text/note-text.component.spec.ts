import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteText } from './note-text.component';

describe('NoteText', () => {
  let component: NoteText;
  let fixture: ComponentFixture<NoteText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteText]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
