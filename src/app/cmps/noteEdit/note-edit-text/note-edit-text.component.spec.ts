import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditTextComponent } from './note-edit-text.component';

describe('NoteEditTextComponent', () => {
  let component: NoteEditTextComponent;
  let fixture: ComponentFixture<NoteEditTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteEditTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
