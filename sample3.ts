function main(){
    let bowlingmachine = new BowlingMachine();
    bowlingmachine.initialization();      //1ラウンド目の1投目
    //2投して10に満たないケース
    bowlingmachine.input_number_of_knocked_pin(3);      //1ラウンド目の1投目
    bowlingmachine.input_number_of_knocked_pin(4);      //1ラウンド目の2投目
    //スペア→2投して10に満たないケース
    bowlingmachine.input_number_of_knocked_pin(3);      //2ラウンド目の1投目
    bowlingmachine.input_number_of_knocked_pin(7);      //2ラウンド目の2投目
    bowlingmachine.input_number_of_knocked_pin(3);      //3ラウンド目の1投目
    bowlingmachine.input_number_of_knocked_pin(4);      //3ラウンド目の2投目
    //ストライク→2投して10に満たないケース
    bowlingmachine.input_number_of_knocked_pin(10);     //4ラウンド目の1投目
    bowlingmachine.input_number_of_knocked_pin(3);      //5ラウンド目の1投目
    bowlingmachine.input_number_of_knocked_pin(4);      //5ラウンド目の2投目
}

class BowlingScoreCalculator {
    constructor() {
    }

    alert_over_ten(): void{
        console.log('得点が10点を超えたので、10点に修正しました。');
    }
 
    calc_score_in_this_round(number_of_knocked_pin:number, score_in_each_round: number): number{
        let score_in_this_round = number_of_knocked_pin + score_in_each_round;
        if(10 < score_in_this_round){
            score_in_this_round = 10;
            this.alert_over_ten();
        }
        return score_in_this_round;
    }

    calc_score_add_bonus_point(number_of_knocked_pin: number, number_of_throw: number, number_of_round: number, strike_status_in_even: boolean, spare_status_in_even: boolean, strike_status_in_odd: boolean, spare_status_in_odd: boolean): number{
        let bonus_point = 0;
        if(0 === (number_of_throw%2)){
            if((0 === (number_of_round%2)) && spare_status_in_odd){
                bonus_point =  number_of_knocked_pin;
            }
            if((1 === (number_of_round%2)) && spare_status_in_even){
                bonus_point = number_of_knocked_pin;
            }
            if((0 === (number_of_round%2)) && strike_status_in_odd){
                bonus_point = number_of_knocked_pin;
            }
            if((1 === (number_of_round%2)) && strike_status_in_even){
                bonus_point = number_of_knocked_pin;
            }
        }
        if(1 === (number_of_throw%2)){
            if((0 === (number_of_round%2)) && strike_status_in_odd){
                bonus_point = number_of_knocked_pin;
            }
            if((1 === (number_of_round%2)) && strike_status_in_even){
                bonus_point = number_of_knocked_pin;
            }
        }
        return bonus_point;
    }

    calc_total_score_so_far(number_of_knocked_pin: number, bonus_point: number, total_score_so_far:number): number {
       return number_of_knocked_pin + bonus_point + total_score_so_far;
    }
 }
 
 class BowlingMachine {
    private strike_status_in_even; //true: ストライク
    private spare_status_in_even; //true: スペア
    private strike_status_in_odd; //true: ストライク
    private spare_status_in_odd; //true: スペア
    private evaluate_proceed_number_of_round; 
    private number_of_knocked_pin;
    private total_score_so_far;
    private number_of_round;
    private number_of_throw;
    private score_in_each_round;
    private bonus_point;
    private bowlingscorecalculator:BowlingScoreCalculator = new BowlingScoreCalculator();
 
    constructor() {
    };


    display_initial_message(): void{
        console.log('ボウリングゲームにようこそ。現在1ラウンド目の1投目です。倒した本数を入力して下さい。');
    }

    initialization(): void {
        this.strike_status_in_even = false;
        this.spare_status_in_even = false;
        this.strike_status_in_odd = false;
        this.spare_status_in_odd = false;
        this.evaluate_proceed_number_of_round = false;
        this.number_of_round = 1;
        this.number_of_throw = 1;
        this.bonus_point = 0;
        this.total_score_so_far = 0;
        this.score_in_each_round = new Array(20);
        for(let i=0; i<20; i++){
            this.score_in_each_round[i] = 0;
        }
        this.display_initial_message();
    }

    evaluate_bonus_point(number_of_throw: number, number_of_round: number, score_in_this_round: number): void{
        if(10 === score_in_this_round){
            if(0 === (number_of_round%2)){
                if(1 === number_of_throw){
                    this.strike_status_in_even = true;
                }
                if(2 === number_of_throw){
                    this.spare_status_in_even = true;
                }
            }
            if(1 === (number_of_round%2)){
                if(1 === number_of_throw){
                    this.strike_status_in_odd = true;
                }
                if(2 === number_of_throw){
                    this.spare_status_in_odd = true;
                }
            }
        }
    }

    score_in_previous_round(bonus_point: number, score_in_previous_round: number): number{
        return bonus_point + score_in_previous_round;
    }

    display_score_in_each_round(): void{
        for(let i=1; i<=this.number_of_round; i++){
            console.log(i+'ラウンド目の得点は'+this.score_in_each_round[i]+'点です。');
        }
    }

    display_total_score_so_far(total_score_so_far: number): void{
        console.log('現在までの総得点は'+total_score_so_far+'点です。');
    }

    reset_number_of_throw(): void{
        this.number_of_throw = 1;
        this.evaluate_proceed_number_of_round = true;
    }

    proceed_number_of_throw(strike_status_in_even: boolean, spare_status_in_even: boolean, strike_status_in_odd: boolean, spare_status_in_odd: boolean, number_of_throw: number, number_of_round: number): void{
        if(2 === number_of_throw){
            this.reset_number_of_throw();
            
            if(0 === (number_of_round%2)) {
                strike_status_in_odd = false;
                spare_status_in_odd = false;
            }
            if(1 === (number_of_round%2)) {
                strike_status_in_even = false;
                spare_status_in_even = false;
            }
        }

        if(1 === number_of_throw){
            if((0 === (number_of_round%2)) && strike_status_in_even) {
                this.reset_number_of_throw();
                if(0 === (number_of_round%2)) {
                    strike_status_in_odd = false;
                    spare_status_in_odd = false;
                }
            } else if((1 === (number_of_round%2)) && strike_status_in_odd) {
                this.reset_number_of_throw();
                if(1 === (number_of_round%2)) {
                    strike_status_in_even = false;
                    spare_status_in_even = false;
                }
            } else{
                this.number_of_throw += 1;
                this.evaluate_proceed_number_of_round = false;
            }
        }
    }

    proceed_number_of_round(proceed_number_of_round: boolean, number_of_round: number): void{
        if(proceed_number_of_round){
            this.number_of_round += 1;
            this.evaluate_proceed_number_of_round = false;
        }
    }

    display_number_of_round_throw(number_of_round: number,number_of_throw: number): void{
        console.log('//////////////////////////////////////');
        console.log('現在は'+number_of_round+'ラウンド目の'+number_of_throw+'投目です。次に倒した本数を入力して下さい。');
    }
    
    input_number_of_knocked_pin(number_of_knocked_pin: number): void {
        this.score_in_each_round[this.number_of_round] = this.bowlingscorecalculator.calc_score_in_this_round(number_of_knocked_pin, this.score_in_each_round[this.number_of_round]);
        this.evaluate_bonus_point(this.number_of_throw, this.number_of_round, this.score_in_each_round[this.number_of_round]);
        this.bonus_point = this.bowlingscorecalculator.calc_score_add_bonus_point(number_of_knocked_pin, this.number_of_throw, this.number_of_round, this.strike_status_in_even, this.spare_status_in_even, this.strike_status_in_odd, this.spare_status_in_odd);
        this.score_in_each_round[this.number_of_round-1] = this.score_in_previous_round(this.bonus_point, this.score_in_each_round[this.number_of_round-1]);
        this.display_score_in_each_round();
        this.total_score_so_far = this.bowlingscorecalculator.calc_total_score_so_far(number_of_knocked_pin, this.bonus_point, this.total_score_so_far);
        this.display_total_score_so_far(this.total_score_so_far);
        this.proceed_number_of_throw(this.strike_status_in_even, this.spare_status_in_even, this.strike_status_in_odd, this.spare_status_in_odd, this.number_of_throw, this.number_of_round);
        this.proceed_number_of_round(this.evaluate_proceed_number_of_round, this.number_of_round);
        this.display_number_of_round_throw(this.number_of_round,this.number_of_throw);
    }   
 }
 
 main();
 