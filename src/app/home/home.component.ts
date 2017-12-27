import { Component, OnInit } from '@angular/core';
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
  constructor(
    private leaderservice: LeaderService,
    private dishservice: DishService,
    private promotionservice: PromotionService) { }

  ngOnInit() {
    this.leader = this.leaderservice.getFeaturedLeader();
    this.dish = this.dishservice.getFeaturedDish();
    this.promotion = this.promotionservice.getFeaturedPromotion();
  }

}
