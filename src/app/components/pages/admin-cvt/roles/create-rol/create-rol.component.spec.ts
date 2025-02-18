import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRolComponent } from './create-rol.component';

describe('CreateRolComponent', () => {
  let component: CreateRolComponent;
  let fixture: ComponentFixture<CreateRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
