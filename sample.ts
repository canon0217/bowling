let i:number;               //for文用
let number_of_round = 1;    //現在のラウンド数
let number_of_throw = 1;    //現在の投目 1 or 2をとる
let number_of_knocked_pin_in_round = 0; //現在のラウンドで倒したピン数合計
let score_in_round:number[] = new Array(20); //各ラウンドでの総得点。本当は10ラウンドまでだが、今回は十分大きい数として20を設定
let total_score_so_far = 0; //現在のラウンドまでの総得点
let bonus_point_status_odd_round = 0; //1:ストライク 2:スペア   奇数ラウンド目にストライク/スペアをとった場合
let bonus_point_status_even_round = 0; //1:ストライク 2:スペア  偶数ラウンド目にストライク/スペアをとった場合
let progress_flag = 0;  //1:1投目で10点を超えたので次のラウンドに進む為のフラグ
let syori_okuraseru = 0;    //ラウンド数・投数の更新の際に使用する変数

if((number_of_round == 1) && (number_of_throw == 1)){   //1ラウンド目の1投目のみ表示する。
    console.log('現在は'+number_of_round+'ラウンド目の'+number_of_throw+'投目です。何本倒したか入力して下さい。');
}

class bowling_calculator{
    number_of_knocked_pin:number;   //使用者はxラウンド目のy投目で倒した本数を入力する想定
    constructor(){
        this.number_of_knocked_pin = 0;
    }
    
    calculate_score_so_far(number_of_knocked_pin:number){
        //受け取ったピン数を基に状態を更新///////////////////////////////////////////////////////
        //現在のラウンドで倒したピン数を更新
        number_of_knocked_pin_in_round += number_of_knocked_pin; 
        
        //現在のラウンドでの総得点が10点を超える場合の処理
        if(number_of_knocked_pin_in_round > 10){    
            number_of_knocked_pin -= number_of_knocked_pin_in_round - 10;   //10点を超えた分、現在倒したピン数を調整
            number_of_knocked_pin_in_round = 10;    //現在のラウンドでの総得点を10点に修正
            console.log(number_of_round+'ラウンド目に倒した本数が10本を超えたので、10本に修正しました');
            progress_flag = 1;                  //次のラウンドに進めるピンを立てる
            
            if(number_of_throw == 1){
                if(number_of_round%2==0){
                    bonus_point_status_even_round = 1;             //偶数ラウンド目の1投目の場合はストライク
                }
                if(number_of_round%2==1){
                    bonus_point_status_odd_round = 1;             //奇数ラウンド目の1投目の場合はストライク
                }
            }

            if(number_of_throw == 2){
                if(number_of_round%2==0){
                    bonus_point_status_even_round = 2;             //偶数ラウンド目の1投目の場合はスペア
                }
                if(number_of_round%2==1){
                    bonus_point_status_odd_round = 2;             //奇数ラウンド目の1投目の場合はスペア
                }
            }
        }
        

        //現在のラウンドでの総得点が10点の場合の処理
        if(number_of_knocked_pin_in_round == 10){    
            progress_flag = 1;                  //次のラウンドに進めるピンを立てる
            if(number_of_throw == 1){
                if(number_of_round%2==0){
                    bonus_point_status_even_round = 1;             //偶数ラウンド目の1投目の場合はストライク
                }
                if(number_of_round%2==1){
                    bonus_point_status_odd_round = 1;             //奇数ラウンド目の1投目の場合はストライク
                }
            }
            if(number_of_throw == 2){
                if(number_of_round%2==0){
                    bonus_point_status_even_round = 2;             //偶数ラウンド目の1投目の場合はスペア
                }
                if(number_of_round%2==1){
                    bonus_point_status_odd_round = 2;             //奇数ラウンド目の1投目の場合はスペア
                }
            }
        }

        //ラウンド毎の得点の初期化処理
        if((number_of_round == 1) && (number_of_throw == 1)){
            for(i=0; i<20;i++){
                score_in_round[i] = 0;
            }
            
        }

        //ラウンド毎の得点を更新////////////////////////////////////////
        //今回投げて倒した分を加算/////////
        score_in_round[number_of_round - 1] += number_of_knocked_pin;
        
        //スペアとストライクの分を加算/////////
        //現在が偶数ラウンド目の場合、前のラウンド(奇数ラウンド)がスペア・ストライクでないか確認
        if(number_of_round%2==0){
            //前回ストライクで現在1投目の場合、かつまたストライクを出した場合の処理
            if((bonus_point_status_odd_round == 1) && (number_of_throw == 1)){
                score_in_round[number_of_round - 2] += number_of_knocked_pin;
                if(number_of_knocked_pin == 10){
                    bonus_point_status_odd_round = 0;
                }
            }
            //前回ストライクで現在2投目の場合の処理
            if((bonus_point_status_odd_round == 1) && (number_of_throw == 2)){
                 score_in_round[number_of_round - 2] += number_of_knocked_pin;   //前のラウンドでストライクだった場合に、
                bonus_point_status_odd_round = 0;
            }
            //前回スペアの場合の処理
            if(bonus_point_status_odd_round == 2){
                score_in_round[number_of_round - 2] += number_of_knocked_pin;   //前のラウンドでスペアだった場合に、
                bonus_point_status_odd_round = 0;
            }   
        }       
        //現在が奇数ラウンド目の場合、前のラウンド(偶数ラウンド)がスペア・ストライクでないか確認
        if(number_of_round%2==1){
            //前回ストライクで現在1投目の場合、かつまたストライクを出した場合の処理
            if((bonus_point_status_even_round == 1) && (number_of_throw == 1)){
                score_in_round[number_of_round - 2] += number_of_knocked_pin;  
                if(number_of_knocked_pin == 10){
                    bonus_point_status_even_round = 0;
                }
            }
            //前回ストライクで現在2投目の場合の処理
            if((bonus_point_status_even_round == 1) && (number_of_throw == 2)){
                score_in_round[number_of_round - 2] += number_of_knocked_pin;   //前のラウンドでストライクだった場合に、
                bonus_point_status_even_round = 0;
            }
            //前回スペアの場合の処理
            if(bonus_point_status_even_round == 2){
                score_in_round[number_of_round - 2] += number_of_knocked_pin;   //前のラウンドでスペアだった場合に、
                bonus_point_status_even_round = 0;
            }   
        }               

        
        //現在のラウンドまでの総得点を更新
        total_score_so_far = 0;
        for(i=0; i<number_of_round;i++){
            total_score_so_far += score_in_round[i];
        }
        ////////////////////////////////////////////////////////////////////////////////////

        //表示//////////////////////////////////////////////////////////////////////////////////
        //現在のラウンドで倒したピンの数合計////
        console.log(number_of_round+'ラウンド目に倒したピン数合計は'+number_of_knocked_pin_in_round+'本です');
        
        //現在のラウンドまでの、各ラウンドでの得点////
        for(i=0; i<number_of_round;i++){
            console.log((i+1)+'ラウンド目の得点は'+score_in_round[i]+'点です');
        }

        //現在のラウンドまでの総得点////
        console.log(number_of_round+'ラウンド目までの総得点は'+total_score_so_far+'点です');
        ////////////////////////////////////////////////////////////////////////////////////

        //ラウンド数・投数の更新////////////////////////////////////////////////////////////////
        //10点を超えたので次のラウンドに進む
        if(progress_flag == 1){     
            number_of_round += 1; 
            number_of_throw = 1;
            progress_flag = 0;
            //このままnumber_of_knocked_pin_in_round = 0とすると、1投目で10点を超えなかった場合のif文に引っかかるので、
            //処理を送らせるフラグを立てる syori_okuraseru = 1; また倒した本数を10本以上にしておく number_of_knocked_pin_in_round = 10
            syori_okuraseru = 1;
            number_of_knocked_pin_in_round = 10;
        }

        //2投したので次のラウンドに進む
        if(number_of_throw == 2){       
            number_of_round += 1; 
            number_of_throw = 1;
            progress_flag = 0;
            //このままnumber_of_knocked_pin_in_round = 0とすると、1投目で10点を超えなかった場合のif文に引っかかるので、
            //処理を送らせるフラグを立てる syori_okuraseru = 1; また倒した本数を10本以上にしておく number_of_knocked_pin_in_round = 10
            syori_okuraseru = 1;
            number_of_knocked_pin_in_round = 10;
        }

        //1投目で10点を超えなかったので、2投目に進む
        //syori_okuraseruで避けたい条件分
        if((number_of_throw == 1) && (number_of_knocked_pin_in_round < 10)){ 
            number_of_throw = 2;
        }

        //処理を送らせるフラグの回収
        if(syori_okuraseru == 1){
            number_of_knocked_pin_in_round = 0;
            syori_okuraseru = 0;
        }
        
        //次のラウンド・投目の本数を入力してもらう
        console.log('現在は'+number_of_round+'ラウンド目の'+number_of_throw+'投目です。何本倒したか入力して下さい。');
    }
    
}

//クラスをインスタンス化
let bowling_calculator_instance;
bowling_calculator_instance = new bowling_calculator();


//本当は10ラウンド目までだが、以下のケースでしっかりと動くか確認する
//2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(3);      //1ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //1ラウンド目の2投目
//スペア→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(3);      //2ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(7);      //2ラウンド目の2投目
bowling_calculator_instance.calculate_score_so_far(3);      //3ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //3ラウンド目の2投目
//スペア(10超え)→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(3);      //4ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(8);      //4ラウンド目の2投目
bowling_calculator_instance.calculate_score_so_far(3);      //5ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //5ラウンド目の2投目
//スペア→スペア→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(3);      //6ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(7);      //6ラウンド目の2投目
bowling_calculator_instance.calculate_score_so_far(3);      //7ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(7);      //7ラウンド目の2投目
bowling_calculator_instance.calculate_score_so_far(3);      //8ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //8ラウンド目の2投目
//ストライク→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(10);      //9ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(3);      //10ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //10ラウンド目の2投目
//ストライク(10超え)→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(12);      //11ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(3);      //12ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //12ラウンド目の2投目
//ストライク→スペア→2投して10に満たないケース
bowling_calculator_instance.calculate_score_so_far(10);      //13ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(3);      //14ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(7);      //14ラウンド目の2投目
bowling_calculator_instance.calculate_score_so_far(3);      //15ラウンド目の1投目
bowling_calculator_instance.calculate_score_so_far(4);      //15ラウンド目の2投目
