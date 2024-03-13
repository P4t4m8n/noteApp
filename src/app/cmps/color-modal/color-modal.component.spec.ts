import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorModal } from './color-modal.component';

describe('ColorModal', () => {
  let component: ColorModal;
  let fixture: ComponentFixture<ColorModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorModal]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
