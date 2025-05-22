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
var loop_list = [];

var no4=document.getElementById("no4");
var count;//実行回数をカウントするための変数
var time1;//最初の制限時間(秒)の設定用、ゲーム中の残り時間設定用
var time2;//ゲーム中に時間を記録しながらカウントダウンする用
var timesum=0;//time2が何回も足されて最後のリザルトに影響する変数
var time3=0;//スタートボタンを押したときにゲームにかかる合計時間を計算し記録して、リザルト直前にtimesumとの差を取るための変数
var kaisu ;//実行する回数、ゲームの回数
var scorecount=0; //スコアのカウント用変数

//最初の画面のCSS
no1.style.color="blue";
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
no4.style.color="blue";

var gameselect=[ 
    //いろんなゲームが入ってる配列
    {//1個目
        message:"<h1>ボタンの位置を全て押せ!</h1>",
        content: (ww) =>{ 
            function createButtons() {
                const buttonStates = [false, false, false, false]; // ボタンの押下状態を管理
                let judge = 0; // クリア判定用
                const colors = { text: "red", background: "yellow", hidden: "#fce8e8" }; // スタイル設定
                const buttons = []; // 作成したボタンを格納

                for (let i = 0; i < 4; i++) {
                    const button = document.createElement("button");
                    button.innerText = `Button${i + 1}`; // ボタンのテキスト設定
                    button.style.margin = "5px"; // ボタンのスタイル設定
                    button.style.position = "absolute";
                    button.style.color = colors.text;
                    button.style.backgroundColor = colors.background;
                    button.style.width= "50px";
                    button.style.height= "80px";


                    const RR = Math.random() * 300;
                    const KK = Math.random() * 300;
                    button.style.left = RR + "px"; // 幅300pxの範囲でランダム
                    button.style.top = KK + "px"; // 高さ300pxの範囲でランダム

                    button.addEventListener("click", (event) => {
                        event.preventDefault(); 
                        if (!buttonStates[i]) { //ボタンが押されていないかどうか判定(falseの場合)
                            buttonStates[i] = true; // ボタンが1回押されたことを記録
                            judge += 1; // クリア判定用

                            if (judge === 4) { // 4つ全てのボタンが押されたらクリア
                                scorecount += 1; // スコア加算
                                score2.innerHTML = scorecount; // スコアを表示
                                timesum+=time2; //クリア直後の時間を記録する
                            }
                        }
                    });

                    buttons.push(button); // 作成したボタンを配列に追加
                    ww.appendChild(button); // ボタンを画面に追加
                }

                function hideButtons() {  //ボタンを消す関数
                    buttons.forEach(button => {  //buttonは変数名
                        button.style.color = colors.hidden; //連想配列から取得
                        button.style.backgroundColor = colors.hidden; //連想配列から取得
                        button.style.borderColor = colors.hidden; //連想配列から取得
                    });
                }

                setTimeout(hideButtons, 200); // 0.2秒後にボタンを隠す
            }
        
        // ボタンを4個作成
            createButtons();

        },
    },

    {//2個目
        message:"<h1>画面を10回連打しろ！(フィールドに!)</h1>",
        content: (ww) =>{
            const field=document.createElement("div");//ここでタップ画面(div)作成
            field.style.height="100%";
            field.style.width ="100%";
            field.style.backgroundColor="yellowgreen";
            field.innerHTML="<h1>Push!</h1>"; 
            var tapp = 0; //タップ回数記録用
            var clear =10; //10回連打すればクリア
            field.addEventListener("click", ()=>{
                tapp+=1; //タップ数+1
                if (tapp==clear){//クリア判定(クリア!!!)
                    scorecount += 1; // スコア加算
                    score2.innerHTML = scorecount; // スコアを更新
                    timesum+=time2; //クリア直後の時間を記録する
                    field.style.backgroundColor="red";
                    field.innerHTML="<h1>クリア</h1>";
                }
            });
            field.addEventListener("touchstart" ,()=>{ //タッチしてるときの反応(スマホ用)
                if(tapp < (clear-1)){ //クリアしたら反応しない
                    field.style.backgroundColor="white";
                    field.innerHTML="<h1><br><br>        Oh, pushed!</h1>";
                }
            });
            field.addEventListener("touchend" ,()=>{ //タッチ終わりの反応(スマホ用)
                if(tapp < (clear-1)){ //クリアしたら反応しない
                    field.style.backgroundColor="yellowgreen"; //元の色に戻る
                    field.innerHTML=""; //デフォルトに戻る
                }
            });

            ww.appendChild(field); //ゲーム画面にタッチ機能を追加(設定したfieldを追加)
        },

    },

    {//3個目
        message:"<h1>果物を選べ！</h1>",
        content: (ww) =>{
            math = Math.floor(Math.random() * 4) ;//ランダム(4)
            const fruits = ["<h2>和梨</h2>", "<h2>ぶどう</h2>", "<h2>洋梨</h2>", "<h2>りんご</h2>"];
            const image= ["wanasi.jpg","grapes.jpg", "younasi.jpg", "apple.jpg"];
            ww.innerHTML=`${fruits[math]}`; //ランダムで果物メッセージ
            ww.style.color="blue";
            function kudamono(math) { //mathを引数に, 正解の番号がmath
                const buttonStates = [false, false, false, false]; // ボタンの状態を管理
                const seikai = [0, 0, 0, 0]; //どのボタンが正解かを記す(あとで該当箇所1にする)
                seikai[math]=1; //正解番号の箇所を1とする
                const buttonCount = 4; // 作成するボタンの数
                const colors = { text: "black", background: "yellow" }; // スタイル設定
                const placeW = [50, 220, 50, 220]; //ボタンの配置(横)
                const placeH = [120, 120, 250, 250]; //ボタンの配置(高さ)
                for (let i = 0; i < buttonCount; i++) {
                    const button = document.createElement("img");
                    button.src=image[i];
                    button.innerText = `Button${i + 1}`; // ボタンのテキスト設定
                    button.style.margin = "5px"; // スタイル
                    button.style.position = "absolute";
                    button.style.color = colors.text;
                    button.style.backgroundColor = colors.background;
                    button.style.width= "90px";
                    button.style.height= "120px";


                    // ボタンを配置
                    button.style.left = placeW[i] + "px";
                    button.style.top =placeH[i] + "px";
                    // クリックイベントを設定
                    button.addEventListener("click", (event) => {
                        event.preventDefault();
                        if(seikai[i]=="1"){ //正解のボタンのイベント
                            if (!buttonStates[i]) { // 押されていない場合のみ処理
                                buttonStates[i] = true; // 押された状態に設定
                                button.style.backgroundColor="red";// 押されたら赤に変わる
                                scorecount += 1; // スコア加算
                                score2.innerHTML = scorecount; // スコアを更新
                                timesum+=time2; //クリア直後の時間を記録する
                                ww.style.backgroundColor="yellow";
                            }
                        }else{ //不正解のボタンのイベント
                            if (!buttonStates[i]) { // 押されていない場合のみ処理
                                buttonStates[i] = true; // 押された状態に設定
                                button.style.backgroundColor="blue";// 押されたら青に変わる
                                if(ww.style.backgroundColor!="yellow"){
                                    ww.style.backgroundColor="grey";
                                }
                            } 
                        }
                    });

                    ww.appendChild(button); // ボタンを画面に追加
                }
            }

            // ボタンを4個作成
            kudamono(math); //mathは正解の番号
        },
    },

    {//4個目
        message:"<h1>計算して答えよ！！</h1>",
        content: (ww) =>{
            function calc(){
                var a = Math.round(Math.random() * 10);
                var b = Math.round(Math.random() * 10);
                var select_a = Math.round((Math.random() * 10)+(Math.random() * 10));
                var select_b = Math.round((Math.random() * 10)+(Math.random() * 10));
                var c = Math.round(a + b);
                //かぶり防止
                if (c == select_a){
                    select_a = select_a + 1;
                }
                if (c == select_b){
                    select_b = select_b +1;
                }
                
                if (select_a == select_b){
                    select_a = select_a + 1;
                }
                //選択肢表示
                const div_a=document.createElement("div");//ここでdiv作成
                //css位置や色など
                div_a.style.width="80px";
                div_a.style.height="80px";
                div_a.style.position="absolute";
                div_a.style.top="200px";
                div_a.style.left="40px";
                div_a.style.fontSize="50px";
                div_a.style.backgroundColor="orange";

                const div_b=document.createElement("div");//ここでdiv作成
                //css位置や色など
                div_b.style.width="80px";
                div_b.style.height="80px";
                div_b.style.position="absolute";
                div_b.style.top="200px";
                div_b.style.left="140px";
                div_b.style.fontSize="50px";
                div_b.style.backgroundColor="lightblue";

                const div_c=document.createElement("div");//ここでdiv作成
                //css位置や色など
                div_c.style.width="80px";
                div_c.style.height="80px";
                div_c.style.position="absolute";
                div_c.style.top="200px";
                div_c.style.left="240px";
                div_c.style.fontSize="50px";
                div_c.style.backgroundColor="yellowgreen";

                let cal_list = [select_a, select_b, c] //計算の値の格納
                var correct = 2;
                var i = Math.floor(Math.random() * 2); // 0, 1, 2 のいずれかをランダムに
	            ww.innerHTML = "<h1>"+ a + "+"+ b + "= ?</h1>";
	            div_a.textContent = cal_list[i]; //ここで要素追加
                if (i == 2){
                    i = 0;
                    correct = 0;
                }else{
                    i += 1;
                }

                div_b.textContent = cal_list[i];//ここで要素追加
                //document.getElementById("select_b").textContent += cal_list;
                if (i == 2){ 
                    i = 0;
                    correct = 1;
                }else{
                    i += 1;
                }
                div_c.textContent = cal_list[i];//ここで要素追加
                //選択肢１
                div_a.addEventListener('click', function(event) {//それぞれのdivのイベント
                    if (correct == 0){ //正解
                        ww.innerHTML = "<h1>clear</h1>";
                        event.target.style.backgroundColor = 'lightgreen';
                        scorecount += 1; // スコア加算
                        score2.innerHTML = scorecount; // スコアを更新
                        timesum+=time2; //クリア直後の時間を記録する
                        ww.style.backgroundColor="yellow";
                    }else{ //不正解
                        ww.innerHTML = "<h1>failure</h1>";
                        event.target.style.backgroundColor = 'red';
                        ww.style.backgroundColor="grey";
                        timesum+=time2;//時間記録
                    }
                });
                //選択肢２
                div_b.addEventListener('click', function(event) {//それぞれのdivのイベント
                    if (correct == 1){ //正解
                        ww.innerHTML = "<h1>clear</h1>";
                        event.target.style.backgroundColor = 'lightgreen';
                        scorecount += 1; // スコア加算
                        score2.innerHTML = scorecount; // スコアを更新
                        timesum+=time2; //クリア直後の時間を記録する
                        ww.style.backgroundColor="yellow";
                    }else{//不正解
                        ww.innerHTML = "<h1>failure</h1>";
                        event.target.style.backgroundColor = 'red';
                        ww.style.backgroundColor="grey";
                        timesum+=time2;//時間記録
                    }
                });
                //選択肢３
                div_c.addEventListener('click', function(event) {//それぞれのdivのイベント
                    if (correct == 2){ //正解
                        ww.innerHTML = "<h1>clear</h1>";
                        event.target.style.backgroundColor = 'lightgreen';
                        scorecount += 1; // スコア加算
                        score2.innerHTML = scorecount; // スコアを更新
                        timesum+=time2; //クリア直後の時間を記録する
                        ww.style.backgroundColor="yellow";
                    }else{//不正解
                        ww.innerHTML = "<h1>failure</h1>";
                        event.target.style.backgroundColor = 'red';
                        ww.style.backgroundColor="grey";
                        timesum+=time2;//時間記録
                    }

                });
                ww.appendChild(div_a);//div追加
                ww.appendChild(div_b);//div追加
                ww.appendChild(div_c);//div追加
            }
            calc();  //ゲーム関数の実行
        },
    },

];

function getRandomFruit() { //ゲーム3で使う関数
    const fruits = ["ぶどう", "洋梨", "りんご", "和梨"];  // 変えたい文字列の配列
    const randomIndex = Math.floor(Math.random() * fruits.length);  // ランダムなインデックスを選択
    return fruits[randomIndex];  // ランダムに選ばれた果物名を返す
}
    
//スタートボタンクリックした後
start1button.addEventListener("click", (event) => {
    event.preventDefault(); // デフォルトのフォーム送信防止
    document.body.style.backgroundColor="skyblue"; //body色の初期化
    no4.innerHTML="";
    count=1; //カウントの初期化
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
    scorecount=0 //スコア初期化 (セット)
    score2.innerHTML=scorecount;//スコア初期化(セット)
    game1.innerHTML="";//ゲームメッセージを初期化
    game2.innerHTML=""; //ゲーム画面を初期化
    game2.style.color="";//ゲーム画面の文字色リセット
    game2.style.backgroundColor="#fce8e8";
    /////時間領域
    time2=time1;//ゲーム設定時間をtime2に代入(time1が変更されるのを防ぐ)
    timecount.innerHTML=Math.round((time2 / 1000) * 10) / 10;//残り時間の記録
    let interval = setInterval(()=>{
        time2-=1000; //残り時間の更新
        timecount.innerHTML=Math.round((time2 / 1000) * 10) / 10;//残り時間の更新(表示)
    }, 1000 );//1秒ごとに実行してカウントダウン  
    ////////
    //ここでゲームの選択(1回目)
    var gamenumber=Math.floor(Math.random() * gameselect.length) //ゲームの番号, ゲーム配列の中からランダム
    gamecontent=gameselect[gamenumber];//配列からゲームの内容を取得
    //gamecontent=gameselect[0];//配列[0]からゲームの内容を取得
    game1.innerHTML=gamecontent.message;//一個の連想配列からメッセージを出力
    gamecontent.content(game2); //一個の連想配列からcontentを関数として画面に出力

    function gameLoop() {
        if (count <= kaisu) {
            setTimeout(() => {
                game1.innerHTML="";//ゲームメッセージを初期化
                game2.innerHTML=""; //ゲーム画面を初期化
                game2.style.color="";//ゲーム画面の文字色リセット
                game2.style.backgroundColor="#fce8e8";
                time2=time1;//記録時間を制限時間まで引き上げ
                
                //ここでゲームの選択(2回目以降)
                var i =1;
                for(;;){
                    if (loop_list[i] == gamenumber){
                        gamenumber=Math.floor(Math.random() * gameselect.length) //ゲームの番号, ゲーム配列の中からランダム
                        i = 1;
                    }
                    if (i == count){
                        break;
                    }
                    i++;
                }
                count++; //ここで実行回数をカウント
                loop_list[count] = gamenumber;
                gamecontent=gameselect[gamenumber];//配列からゲームの内容を取得
                //gamecontent=gameselect[1];//配列からゲームの内容を取得
                game1.innerHTML=gamecontent.message;//一個の連想配列からメッセージを出力
                gamecontent.content(game2); //一個の連想配列からcontentを関数として画面に出力

                //////////////////
  
                time1-=1000; //次の実行に向けてここで１秒減らす
                
                timee = Math.round((time1 / 1000) * 10) / 10; // 小数第1位まで丸めて数値として保持
                count1.innerHTML="ループ"+count+"回目" +"　時間"+timee+"秒";

                gameLoop(); //二重呼び出しにより指定回数分ループ
            }, time1);//time1で制限時間(実行時間)をコントロール
            
        }else{
        ///ゲームループ終了直後処理  ///////////// 
        count1.innerHTML="";
        game1.textContent=""; //ゲームメッセージを初期化
        game2.innerHTML=""; //ゲーム画面を初期化
        clearInterval(interval);//setIntervalの停止
        
        //result() //リザルト画面に飛ぶ関数を呼び出し
        
        /////////////////////////////////
        }
    }
    // ゲームループ開始
    gameLoop();
    
});

//////////////////////////////////////
function result(){
    
    var timeresult = Math.round(((time3-timesum) / 1000)*10)/10;//タスククリアにかかった合計時間(秒)
    start1button.innerHTML="";//スタートボタンの文字を変更
    if(scorecount==4){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは上手です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>とてもいいです<br>「最終スコア:"+scorecount+"/4」<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#228B22";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはまあ上手です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br>「最終スコア:"+scorecount+"/4」<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#1E90FF";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br>「最終スコア:"+scorecount+"/4」<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#006400";
        }
    }
    if(scorecount==3){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはまあ上手です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>とてもいいです<br>「最終スコア:"+scorecount+"/4」<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#1E90FF";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br>「最終スコア:"+scorecount+"/4」<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#006400";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br>「最終スコア:"+scorecount+"/4」<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#FFD700";
        }
    }
    if(scorecount==2){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>とてもいいです<br>「最終スコア:"+scorecount+"/4」<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#006400";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br>「最終スコア:"+scorecount+"/4」<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#FFD700";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは下手くそです!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br>「最終スコア:"+scorecount+"/4」<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#FF4500";
        }
    }
    if(scorecount==1){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>とてもいいです<br>「最終スコア:"+scorecount+"/4」<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#FFD700";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは下手くそです!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br>「最終スコア:"+scorecount+"/4」<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#FF4500";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはひどすぎです!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br>「最終スコア:"+scorecount+"/4」<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#8B0000";
        }
    }
    if(scorecount==0){
        no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは論外です!!<br><br>「タスクにかかった<br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br>「最終スコア:"+scorecount+"/4」<br>やる気がないですね</h1>";//メッセージをここに書く
        document.body.style.backgroundColor="white";
    }
    




    //////////////////////////////////////////////////
    //もう一回挑戦ボタン(ここで難易度を上げてリセットとかする？)
    //   ↓ボタン表示
    //const newbutton=document.createElement('button');
    //newbutton.innerText="もう一回挑戦！";
    //newbutton.style.backgroundColor="white";
    //newbutton.style.color="red";
    //newbutton.addEventListener("click", () => {
    
    //});
    
}
    
