import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditManagerComponent } from './note-edit-manager.component';

describe('NoteEditManagerComponent', () => {
  let component: NoteEditManagerComponent;
  let fixture: ComponentFixture<NoteEditManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteEditManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteEditManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
