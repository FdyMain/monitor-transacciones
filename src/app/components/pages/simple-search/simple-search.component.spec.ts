import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSimpleComponent } from './simple-search.component';

describe('BatchSimpleComponent', () => {
  let component: BatchSimpleComponent;
  let fixture: ComponentFixture<BatchSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
