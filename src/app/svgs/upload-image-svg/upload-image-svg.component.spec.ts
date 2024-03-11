import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageSvgComponent } from './upload-image-svg.component';

describe('UploadImageSvgComponent', () => {
  let component: UploadImageSvgComponent;
  let fixture: ComponentFixture<UploadImageSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadImageSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadImageSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
