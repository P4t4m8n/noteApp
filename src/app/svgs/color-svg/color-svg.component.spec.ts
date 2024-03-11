import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSvgComponent } from './color-svg.component';

describe('ColorSvgComponent', () => {
  let component: ColorSvgComponent;
  let fixture: ComponentFixture<ColorSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
