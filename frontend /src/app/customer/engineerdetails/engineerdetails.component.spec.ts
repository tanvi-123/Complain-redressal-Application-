import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerdetailsComponent } from './engineerdetails.component';

describe('EngineerdetailsComponent', () => {
  let component: EngineerdetailsComponent;
  let fixture: ComponentFixture<EngineerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
