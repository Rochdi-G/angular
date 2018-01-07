import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';
import { Comment } from '../shared/comment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})


export class DishdetailComponent implements OnInit {
  
  dish : Dish;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  commentForm: FormGroup;
  errMess: string;

  formErrors = {
    'name': '',
    'comment': '',
  };

  validationMessages = {
    'name': {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
  };

  constructor(
    private dishservice: DishService,
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL

  ) { }
 
  ngOnInit() {
    this.createForm()
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)},
      errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev= this.dishIds[(this.dishIds.length + index -1)%this.dishIds.length];
    this.next= this.dishIds[(this.dishIds.length + index +1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){
    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      comment: ['', Validators.required],
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.comment.author = this.commentForm.value.name;
    this.comment.rating = this.commentForm.value.rating;
    this.commentForm.reset({
      name: '',
      comment: '',
    });
    let date = new Date();
    let n = date.toISOString();
    this.comment.date = n;
    
    this.dish.comments.push(this.comment);


  }
}
