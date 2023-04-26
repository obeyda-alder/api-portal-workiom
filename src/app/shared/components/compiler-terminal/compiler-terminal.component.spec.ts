import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilerTerminalComponent } from './compiler-terminal.component';

describe('CompilerTerminalComponent', () => {
  let component: CompilerTerminalComponent;
  let fixture: ComponentFixture<CompilerTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilerTerminalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompilerTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
