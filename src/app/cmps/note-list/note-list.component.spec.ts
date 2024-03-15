import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteList } from './note-list.component';

describe('NoteList', () => {
  let component: NoteList;
  let fixture: ComponentFixture<NoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteList]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
