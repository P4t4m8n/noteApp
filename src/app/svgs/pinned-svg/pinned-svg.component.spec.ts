import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedSvgComponent } from './pinned-svg.component';

describe('PinnedSvgComponent', () => {
  let component: PinnedSvgComponent;
  let fixture: ComponentFixture<PinnedSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinnedSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PinnedSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
