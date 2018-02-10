import { AbstractControl } from '@angular/forms';
import { Train } from '../shared/train'
import { TRAINS } from '../shared/trains'

export function ValidateTrainNumber(control: AbstractControl) 
{
    for(var i=0;i<TRAINS.length;i++)
    {
        if(control.value == TRAINS[i].number)
        {
            return null;
 
        }
    }
    return { validTrainNumber: true };
}