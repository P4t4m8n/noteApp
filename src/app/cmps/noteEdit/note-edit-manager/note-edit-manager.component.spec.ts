import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditManager } from './note-edit-manager.component';

describe('NoteEditManager', () => {
  let component: NoteEditManager;
  let fixture: ComponentFixture<NoteEditManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditManager]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteEditManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
