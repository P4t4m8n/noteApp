import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNoteTxtComponent } from './edit-note-txt.component';

describe('EditNoteTxtComponent', () => {
  let component: EditNoteTxtComponent;
  let fixture: ComponentFixture<EditNoteTxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNoteTxtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditNoteTxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
