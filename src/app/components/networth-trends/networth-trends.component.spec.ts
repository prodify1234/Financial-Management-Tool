import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworthTrendsComponent } from './networth-trends.component';

describe('NetworthTrendsComponent', () => {
  let component: NetworthTrendsComponent;
  let fixture: ComponentFixture<NetworthTrendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworthTrendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworthTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
