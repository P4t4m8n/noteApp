import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightBulbComponent } from './light-bulb.component';

describe('LightBulbComponent', () => {
  let component: LightBulbComponent;
  let fixture: ComponentFixture<LightBulbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightBulbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LightBulbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
