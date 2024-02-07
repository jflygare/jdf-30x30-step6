import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibUiComponent } from './lib-ui.component';

describe('LibUiComponent', () => {
  let component: LibUiComponent;
  let fixture: ComponentFixture<LibUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
