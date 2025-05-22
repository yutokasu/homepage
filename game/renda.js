            function renda(ww){    
                ww.style.backgroundColor ="#556b2f"
                const field=document.createElement("div");//ここでタップ画面(div)作成
                field.style.height="100%";
                field.style.width ="100%";
                field.style.position = "absolute";
                field.style.top = "0px";
                field.style.backgroundColor="yellowgreen";
                field.innerHTML="<br><br><br><h1>Push!</h1>"; 
                var tapp = 0; //タップ回数記録用
                var clear =10; //10回連打すればクリア
                field.addEventListener("click", ()=>{
                    tapp+=1; //タップ数+1
                    if (tapp==clear){//クリア判定(クリア!!!)
                        scorecount += 1; // スコア加算
                        score2.innerHTML = scorecount; // スコアを更新
                        timesum+=time2; //クリア直後の時間を記録する
                        field.style.backgroundColor="yellow";
                        field.innerHTML="<h1>clear</h1>";
                    }
                });
                field.addEventListener("touchstart" ,()=>{ //タッチしてるときの反応(スマホ用)
                    if(tapp < (clear-1)){ //クリアしたら反応しない
                        field.style.backgroundColor="#98cb30";
                        field.innerHTML="<h2><br><br><br>Oh, pushed!</h2>";
                        field.style.height="96%";
                        field.style.width ="96%";
                        field.style.top = "2%";
                        field.style.left = "2%";
                    }
                });
                field.addEventListener("touchend" ,()=>{ //タッチ終わりの反応(スマホ用)
                    if(tapp < (clear-1)){ //クリアしたら反応しない
                        field.style.backgroundColor="yellowgreen"; //元の色に戻る
                        field.style.height="100%";
                        field.style.width ="100%";
                        field.style.top = "0%";
                        field.style.left = "0%";
                        field.innerHTML="<br><br><br><h1>Push!</h1>"//デフォルトに戻る
                    }
                });

                ww.appendChild(field); //ゲーム画面にタッチ機能を追加(設定したfieldを追加)
            }
