import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let signalRServiceSpy: any;
  let httpClientSpy: any;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', {
      get: of()
    });
    signalRServiceSpy = jasmine.createSpyObj('SignalRService', {
      startConnection: of(),
      addTransferChartDataListener: of()
    });
    signalRServiceSpy.data = [{ data: [1, 2], label: 'test' }, { data: [6, 4], label: 'test 2' }, { data: [3, 4], label: 'test 3' }];

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        ChartsModule
      ],
      providers: [
        { provide: SignalRService, useValue: signalRServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
