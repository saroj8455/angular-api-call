import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostofficeComponent } from './postoffice.component';

describe('PostofficeComponent', () => {
  let component: PostofficeComponent;
  let fixture: ComponentFixture<PostofficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostofficeComponent]
    });
    fixture = TestBed.createComponent(PostofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
