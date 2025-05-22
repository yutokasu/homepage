function gameLoop() {
        
        if (count <= kaisu) {
            setTimeout(() => {
                game1.innerHTML="";//ゲームメッセージを初期化
                game2.innerHTML=""; //ゲーム画面を初期化
                game2.style.color="";//ゲーム画面の文字色リセット
                game2.style.backgroundColor="#fce8e8";
                time2=time1;//記録時間を制限時間まで引き上げ
                //ここでゲームの選択(2回目以降)
                   
                while(1){
                    if(loop_list[0] == gamenumber || loop_list[1] == gamenumber || loop_list[2] == gamenumber){
                        gamenumber=Math.floor(Math.random() * gameselect.length) //ゲームの番号, ゲーム配列の中からランダム
                        //document.getElementById("woo").innerHTML += gamenumber;   
                    
                    }else{
                        break;
                    }
                }
                    
                count++; //ここで実行回数をカウント
                loop_list[count-1] = gamenumber;
                //document.getElementById("woo").innerHTML += gamenumber; 
                //gamenumber=Math.floor(Math.random() * gameselect.length) //ゲームの番号, ゲーム配列の中からランダム
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
        document.getElementById("start1button").style.visibility = "visible";
        document.getElementById("game2").style.visibility = "hidden";
        
        count1.innerHTML="";
        game1.textContent=""; //ゲームメッセージを初期化
        game2.innerHTML=""; //ゲーム画面を初期化
        clearInterval(interval);//setIntervalの停止
        result() //リザルト画面に飛ぶ関数を呼び出し
        /////////////////////////////////
        }
    }

    //////////////////////////////////////
function result(){
    var timeresult = Math.round(((time3-timesum) / 1000)*10)/10;//タスククリアにかかった合計時間(秒)
    start1button.innerHTML="もう一度挑戦！";//スタートボタンの文字を変更
    if(scorecount==4){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは上手です!!<br><br>合計時間:約 "+timeresult+"秒<br>とてもいいです<br><br>最終スコア:"+scorecount+"/4<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#4d4dff";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはまあ上手です!!<br><br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br><br>最終スコア:"+scorecount+"/4<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#52b8cc";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>合計時間:約 "+timeresult+"秒」<br>ここが残念!!<br><br>最終スコア:"+scorecount+"/4<br>とてもいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#52cc8f";
        }
    }
    if(scorecount==3){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはまあ上手です!!<br><br>合計時間:約 "+timeresult+"秒」<br>とてもいいです<br><br>最終スコア:"+scorecount+"/4<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#52b8cc";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>合計時間:約 "+timeresult+"秒<br>まあいいです<br><br>最終スコア:"+scorecount+"/4<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#52cc8f";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>合計時間:約 "+timeresult+"秒<br>ここが残念!!<br><br>最終スコア:"+scorecount+"/4<br>まあいいです</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#b0e645";
        }
    }
    if(scorecount==2){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはちょい残念です!!<br><br>合計時間:約 "+timeresult+"秒<br>とてもいいです<br><br>最終スコア:"+scorecount+"/4<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#52cc8f";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>合計時間:約 "+timeresult+"秒<br>まあいいです<br><br>最終スコア:"+scorecount+"/4<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#b0e645";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは下手くそです!!<br><br>合計時間:約 "+timeresult+"秒<br>ここが残念!!<br><br>最終スコア:"+scorecount+"/4<br>ちょい残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#b0e645";
        }
    }
    if(scorecount==1){
        if(timeresult <= 7){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは残念です!!<br><br>合計時間:約 "+timeresult+"秒<br>とてもいいです<br><br>最終スコア:"+scorecount+"/4<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#b0e645";
        }
        if(timeresult > 7 && timeresult <= 11){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは下手くそです!!<br><br>合計時間:約 "+timeresult+"秒」<br>まあいいです<br><br>最終スコア:"+scorecount+"/4<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#b0e645";
        }
        if(timeresult > 12 ){
            no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたはひどすぎです!!<br><br>合計時間:約 "+timeresult+"秒<br>ここが残念!!<br><br>最終スコア:"+scorecount+"/4<br>ここが残念です</h1>";//メッセージをここに書く
            document.body.style.backgroundColor="#cc8f52";
        }
    }
    if(scorecount==0){
        no4.innerHTML="<br><h1>お疲れさまでした。<br>あなたは論外です!!<br><br>合計時間:約 "+timeresult+"秒<br>ここが残念!!<br><br>最終スコア:"+scorecount+"/4<br>やる気がないですね</h1>";//メッセージをここに書く
        document.body.style.backgroundColor="#e65c5c";
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
    
