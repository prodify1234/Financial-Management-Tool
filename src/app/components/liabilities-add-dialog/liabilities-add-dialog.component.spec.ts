import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilitiesAddDialogComponent } from './liabilities-add-dialog.component';

describe('LiabilitiesAddDialogComponent', () => {
  let component: LiabilitiesAddDialogComponent;
  let fixture: ComponentFixture<LiabilitiesAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiabilitiesAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiabilitiesAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
