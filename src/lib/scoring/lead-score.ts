import { LeadInput } from "@/types/lead";

export function calculateLeadScore(
 input: LeadInput
){
 let score=0;

 if(input.billRange==="250-plus"){
   score+=40;
 }

 if(input.billRange==="150-250"){
   score+=25;
 }

 if(input.billRange==="100-150"){
   score+=10;
 }

 if(input.ownership==="owner"){
   score+=25;
 }

 if(input.timeline==="asap"){
   score+=20;
 }

 if(input.timeline==="1-3-months"){
   score+=10;
 }

 return score;
}