import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainStationsComponent } from './train-stations.component';

describe('TrainStationsComponent', () => {
  let component: TrainStationsComponent;
  let fixture: ComponentFixture<TrainStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
