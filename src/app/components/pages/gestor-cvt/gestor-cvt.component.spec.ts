import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorCvtComponent } from './gestor-cvt.component';

describe('GestorCvtComponent', () => {
  let component: GestorCvtComponent;
  let fixture: ComponentFixture<GestorCvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorCvtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorCvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
