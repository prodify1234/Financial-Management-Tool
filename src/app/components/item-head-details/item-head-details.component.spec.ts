import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHeadDetailsComponent } from './item-head-details.component';

describe('ItemHeadDetailsComponent', () => {
  let component: ItemHeadDetailsComponent;
  let fixture: ComponentFixture<ItemHeadDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemHeadDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemHeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
