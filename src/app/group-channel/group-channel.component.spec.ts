import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChannelComponent } from './group-channel.component';

describe('GroupChannelComponent', () => {
  let component: GroupChannelComponent;
  let fixture: ComponentFixture<GroupChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
