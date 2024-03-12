import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedFullSvgComponent } from './pinned-full-svg.component';

describe('PinnedFullSvgComponent', () => {
  let component: PinnedFullSvgComponent;
  let fixture: ComponentFixture<PinnedFullSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PinnedFullSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PinnedFullSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
