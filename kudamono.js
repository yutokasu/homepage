        function kudamono(ww){
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
                const placeH = [100, 100, 230, 230]; //ボタンの配置(高さ)
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
                                game2.innerHTML=""; //ゲーム画面を初期化
                                ww.style.backgroundColor="yellow";
                                ww.style.color="black"
                                ww.innerHTML = "<h1>clear</h1>";
                                
                            }
                        }else{ //不正解のボタンのイベント
                            if (!buttonStates[i]) { // 押されていない場合のみ処理
                                buttonStates[i] = true; // 押された状態に設定
                                button.style.backgroundColor="blue";// 押されたら青に変わる
                                if(ww.style.backgroundColor!="yellow"){
                                    ww.style.backgroundColor="red";
                                }
                            } 
                        }
                    });

                    ww.appendChild(button); // ボタンを画面に追加
                }
            }

            // ボタンを4個作成
            kudamono(math); //mathは正解の番号
        }

function getRandomFruit() { //ゲーム3で使う関数
    const fruits = ["ぶどう", "洋梨", "りんご", "和梨"];  // 変えたい文字列の配列
    const randomIndex = Math.floor(Math.random() * fruits.length);  // ランダムなインデックスを選択
    return fruits[randomIndex];  // ランダムに選ばれた果物名を返す
}

