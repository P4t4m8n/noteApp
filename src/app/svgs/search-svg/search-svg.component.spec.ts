import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSvgComponent } from './search-svg.component';

describe('SearchSvgComponent', () => {
  let component: SearchSvgComponent;
  let fixture: ComponentFixture<SearchSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSvgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
