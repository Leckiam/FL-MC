import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverpassPage } from './recoverpass.page';

describe('RecoverpassPage', () => {
  let component: RecoverpassPage;
  let fixture: ComponentFixture<RecoverpassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecoverpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
