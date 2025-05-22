function calc(ww){
                
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
                var i = (Math.floor(Math.random() * 100))%3; // 0, 1, 2 のいずれかをランダムに
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
                        ww.style.backgroundColor="red";
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
                        ww.style.backgroundColor="red";
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
                        ww.style.backgroundColor="red";
                        timesum+=time2;//時間記録
                    }

                });
                ww.appendChild(div_a);//div追加
                ww.appendChild(div_b);//div追加
                ww.appendChild(div_c);//div追加
                }

