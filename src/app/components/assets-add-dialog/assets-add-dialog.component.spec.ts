import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAddDialogComponent } from './assets-add-dialog.component';

describe('AssetsAddDialogComponent', () => {
  let component: AssetsAddDialogComponent;
  let fixture: ComponentFixture<AssetsAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsAddDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
