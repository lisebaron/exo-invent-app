import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParticipantDialogComponent } from './delete-participant-dialog.component';

describe('DeleteParticipantDialogComponent', () => {
  let component: DeleteParticipantDialogComponent;
  let fixture: ComponentFixture<DeleteParticipantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteParticipantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteParticipantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
