import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sideBarComponent } from './side-bar.component';

describe('sideBarComponent', () => {
  let component: sideBarComponent;
  let fixture: ComponentFixture<sideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
