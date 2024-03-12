import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoSvgComponent } from './undo-svg.component';

describe('UndoSvgComponent', () => {
  let component: UndoSvgComponent;
  let fixture: ComponentFixture<UndoSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UndoSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UndoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
