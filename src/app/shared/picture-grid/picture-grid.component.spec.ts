import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PictureGridComponent } from './picture-grid.component';

describe('PictureGridComponent', () => {
  let component: PictureGridComponent;
  let fixture: ComponentFixture<PictureGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PictureGridComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
