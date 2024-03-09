import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteManagerEditComponent } from './note-manager-edit.component';

describe('NoteManagerEditComponent', () => {
  let component: NoteManagerEditComponent;
  let fixture: ComponentFixture<NoteManagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteManagerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteManagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
