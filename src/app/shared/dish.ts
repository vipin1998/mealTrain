import {Comment } from './comment'

export class Dish{
    id : number;
    name : string;
    image : string;
    price : string;
    featured : boolean;
    description : string;
    comments : Comment[];
}