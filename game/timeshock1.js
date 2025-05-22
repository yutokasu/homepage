//定義するところ//////////////
var form1=document.getElementById("form1");
var no1 =document.getElementById("no1");
var no2=document.getElementById("no2");
var no3=document.getElementById("no3");
var start1button=document.getElementById("start1button");
var count1=document.getElementById("count");
var score1=document.getElementById("score1");
var timecount=document.getElementById("timecount");
var score2=document.getElementById("score2");//ここがスコア表示（重要）
var game1=document.getElementById("game1");//ゲーム画面(主にメッセージ?)
var game2=document.getElementById("game2");//ゲーム画面(主にコンテンツ?)
var loop_list = [5,5,5,5];
var gamenumber =0;

var no4=document.getElementById("no4");
var count;//実行回数をカウントするための変数
var time1;//最初の制限時間(秒)の設定用、ゲーム中の残り時間設定用
var time2;//ゲーム中に時間を記録しながらカウントダウンする用
var timesum=0;//time2が何回も足されて最後のリザルトに影響する変数
var time3=0;//スタートボタンを押したときにゲームにかかる合計時間を計算し記録して、リザルト直前にtimesumとの差を取るための変数
var kaisu ;//実行する回数、ゲームの回数
var scorecount=0; //スコアのカウント用変数
var interval; //インターバル関数を代入する用

//最初の画面のCSS
/*no1.style.color="blue";
no1.style.fontSize="12px";
start1button.style.borderColor="red";
start1button.style.backgroundColor="white";
start1button.style.color="red";
start1button.style.fontWeight="bold"
score1.style.position="absolute";
score1.style.right="30px";
timecount.style.color="darkred";
timecount.style.fontWeight="bold";
timecount.style.fontSize="23px";
score2.style.color="blue";
score2.style.fontWeight="bold";
score2.style.fontSize="20px";
no4.style.color="blue";*/

var gameselect=[ 
    //いろんなゲームが入ってる配列
    {//1個目
        message:"<h1>隠れたボタンを押せ！</h1>",
        content: (ww) =>{ 
        // ボタンを4個作成
            createButtons(ww);
        },
    },

    {//2個目
        message:"<h1>画面を10回連打しろ！</h1>",
        content: (ww) =>{
            renda(ww);
        },
    },


    {//3個目
        message:"<h1>果物を選べ！</h1>",
        content: (ww) =>{
            kudamono(ww);
        },
    },

    {//4個目
        message:"<h1>計算して答えよ！！</h1>",
        content: (ww) =>{        
            calc(ww);  //ゲーム関数の実行
        },
    },

];


    
//スタートボタンクリックした後
start1button.addEventListener("click", (event) => {
    event.preventDefault(); // デフォルトのフォーム送信防止
    document.getElementById("start1button").style.visibility = "hidden";
    //game2.innerHTML=""; //ゲーム画面を初期化
    document.getElementById("game2").style.visibility = "visible";
    document.body.style.backgroundColor="#695acc;"; //body色の初期化
    no4.innerHTML="";
    count=1; //カウントの初期化
    //var loop_list = [5,5,5,5];
    //↓はif文で難易度の値ごとに変更
    if (no3.value=="1"){      //難易度1
        time1 = 7000; //7000m(秒)
        kaisu = 4; //ゲーム実行回数
    }
    if (no3.value=="2"){      //難易度2
        time1 = 6000; 
        kaisu = 4; //仕様要求では4回に固定であるため
    }
    if (no3.value=="3"){      //難易度3
        time1 = 4900; 
        kaisu = 4; //仕様要求では4回に固定であるため
    }
    //リザルトで使う(ゲーム全体の所要時間を計算して記録)
    let timeKK = time1; //time1を変更するのを防ぐ
    for (let i=0; i<kaisu; i++){ //ゲーム回数分time3に時間を足す
        time3+=timeKK;
        timeKK-=1000; //制限時間の変更分引き算
    }

    var timee = Math.round((time1 / 1000) * 10) / 10; // 小数第1位まで丸めて数値として保持
    count1.innerHTML="ループ"+count+"回目" +"　時間"+timee+"秒";
    count1.style.color="#dcdcdc";
    scorecount=0 //スコア初期化 (セット)
    score2.innerHTML=scorecount;//スコア初期化(セット)
    game1.innerHTML="";//ゲームメッセージを初期化
    game2.innerHTML=""; //ゲーム画面を初期化
    game2.style.color="";//ゲーム画面の文字色リセット
    game2.style.backgroundColor="#fce8e8";
    /////時間領域
    time2=time1;//ゲーム設定時間をtime2に代入(time1が変更されるのを防ぐ)
    timecount.innerHTML=Math.round((time2 / 1000) * 10) / 10;//残り時間の記録
    interval = setInterval(()=>{
        time2-=1000; //残り時間の更新
        timecount.innerHTML=Math.round((time2 / 1000) * 10) / 10;//残り時間の更新(表示)
    }, 1000 );//1秒ごとに実行してカウントダウン  
    ////////
    //ここでゲームの選択(1回目)
    var gamenumber=Math.floor(Math.random() * gameselect.length) //ゲームの番号, ゲーム配列の中からランダム
    gamecontent=gameselect[gamenumber];//配列からゲームの内容を取得
    loop_list[count-1] = gamenumber;
    //document.getElementById("woo").innerHTML += gamenumber; 
    //gamecontent=gameselect[0];//配列[0]からゲームの内容を取得
    game1.innerHTML=gamecontent.message;//一個の連想配列からメッセージを出力
    gamecontent.content(game2); //一個の連想配列からcontentを関数として画面に出力

    // ゲームループ開始
    gameLoop();//ゲームループ関数
    
});


