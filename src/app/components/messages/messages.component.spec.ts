import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/components/messages/messages.component.spec.ts
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesComponent ]
=======
import { PostsCreateComponent } from './posts-create.component';

describe('PostsCreateComponent', () => {
  let component: PostsCreateComponent;
  let fixture: ComponentFixture<PostsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCreateComponent ]
>>>>>>> dev:src/app/components/posts-create/posts-create.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD:src/app/components/messages/messages.component.spec.ts
    fixture = TestBed.createComponent(MessagesComponent);
=======
    fixture = TestBed.createComponent(PostsCreateComponent);
>>>>>>> dev:src/app/components/posts-create/posts-create.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
