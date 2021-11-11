import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserDetailComponent } from './github-user-detail.component';

describe('GithubUserDetailComponent', () => {
  let component: GithubUserDetailComponent;
  let fixture: ComponentFixture<GithubUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
