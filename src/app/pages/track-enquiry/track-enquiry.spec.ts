import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackEnquiry } from './track-enquiry';

describe('TrackEnquiry', () => {
  let component: TrackEnquiry;
  let fixture: ComponentFixture<TrackEnquiry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackEnquiry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackEnquiry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
