import { LightningElement, api } from 'lwc';
  
export default class CustomCommunityComponent extends LightningElement {

 @api buttonText;

 handleClick() {
   console.log("Button Clicked!");
 }
}