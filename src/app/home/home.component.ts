import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  leader: Leader;
  dish: Dish;
  promotion: Promotion;
  dishErrMess: string;

  constructor(
    private leaderservice: LeaderService,
    private dishservice: DishService,
    private promotionservice: PromotionService,
    @Inject('BaseURL') private BaseURL
  ) { }

  ngOnInit() {
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader);
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
  }

}
