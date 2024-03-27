import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEdit } from './note-edit.component';

describe('NoteEdit', () => {
  let component: NoteEdit;
  let fixture: ComponentFixture<NoteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEdit]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
