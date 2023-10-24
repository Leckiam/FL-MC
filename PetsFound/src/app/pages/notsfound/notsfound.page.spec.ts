import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotsfoundPage } from './notsfound.page';

describe('NotsfoundPage', () => {
  let component: NotsfoundPage;
  let fixture: ComponentFixture<NotsfoundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotsfoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
