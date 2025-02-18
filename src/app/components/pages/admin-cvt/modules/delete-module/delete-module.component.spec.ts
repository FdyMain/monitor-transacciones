import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModuleComponent } from './delete-module.component';

describe('DeleteModuleComponent', () => {
  let component: DeleteModuleComponent;
  let fixture: ComponentFixture<DeleteModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
