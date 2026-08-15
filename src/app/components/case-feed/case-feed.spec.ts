import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFeed } from './case-feed';

describe('CaseFeed', () => {
  let component: CaseFeed;
  let fixture: ComponentFixture<CaseFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
