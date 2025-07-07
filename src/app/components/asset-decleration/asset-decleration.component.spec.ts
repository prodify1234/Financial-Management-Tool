import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeclerationComponent } from './asset-decleration.component';

describe('AssetDeclerationComponent', () => {
  let component: AssetDeclerationComponent;
  let fixture: ComponentFixture<AssetDeclerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDeclerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetDeclerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
