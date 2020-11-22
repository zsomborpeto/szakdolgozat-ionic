import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BottomTabsPage } from './bottom-tabs.page';

describe('BottomTabsPage', () => {
  let component: BottomTabsPage;
  let fixture: ComponentFixture<BottomTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
