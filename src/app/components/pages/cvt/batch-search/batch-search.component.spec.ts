import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSearchComponent } from './batch-search.component';

describe('BatchSearchComponent', () => {
  let component: BatchSearchComponent;
  let fixture: ComponentFixture<BatchSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
