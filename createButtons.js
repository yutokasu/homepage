function createButtons(ww) {
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
                                game2.innerHTML=""; //ゲーム画面を初期化
                                ww.style.backgroundColor="yellow";
                                ww.innerHTML = "<h1>clear</h1>";
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

