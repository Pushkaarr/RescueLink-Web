import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCase } from './report-case';

describe('ReportCase', () => {
  let component: ReportCase;
  let fixture: ComponentFixture<ReportCase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportCase],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
