import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoConsultaDialogComponent } from './proceso-consulta-dialog.component';

describe('ProcesoConsultaDialogComponent', () => {
  let component: ProcesoConsultaDialogComponent;
  let fixture: ComponentFixture<ProcesoConsultaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoConsultaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoConsultaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
