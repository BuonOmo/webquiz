export class Result {
  domains: Array<string>;
  timestamp: Date;
  goodAnswers: number;
  totalAnswers: number;
  surrender: boolean;
  
  constructor(domains: Array<string>, timestamp: Date, goodAnswers: number, totalAnswers: number, surrender: boolean) {
    this.domains = domains;
    this.timestamp = timestamp;
    this.goodAnswers = goodAnswers;
    this.totalAnswers = totalAnswers;
    this.surrender = surrender;
  }
}