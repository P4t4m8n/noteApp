import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteManagerDetailsComponent } from './note-manager-details.component';

describe('NoteManagerDetailsComponent', () => {
  let component: NoteManagerDetailsComponent;
  let fixture: ComponentFixture<NoteManagerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteManagerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
