//从url读取参数
var players=[];
var playerCharator=[];
if(/\?/.test(window.location.href)){
    var data = unescape(window.location.href.split("?")[1]).split(";");
    players=data[0].split("=")[1].slice(2,-2).split('","')
    playerCharator=data[1].split("=")[1].slice(1,-1).split(",");
}
//DOM读取完成后

$(document).ready(function(){
    //当前活跃玩家序号
    var num = 0;
    //事件记录数组
    var eventOrder = [];
    //当前进行到
    var order = 0;
    //天亮时游戏身份数组
    var endCharator = [];
    //身份牌元素数组
    var cardLists = $(".under .card");
    //身份牌src值数组
    var src=[
        "images/charator/doppelganger.jpg",
        "images/charator/werewolf.jpg",
        "images/charator/werewolf.jpg",
        "images/charator/minion.jpg",
        "images/charator/drunk.jpg",

        "images/charator/insomniac.jpg",
        "images/charator/mason.jpg",
        "images/charator/mason.jpg",
        "images/charator/robber.jpg",
        "images/charator/seer.jpg",

        "images/charator/troublemaker.jpg",
        "images/charator/villager.jpg",
        "images/charator/villager.jpg",
        "images/charator/villager.jpg",
        "images/charator/witch.jpg",

        "images/charator/alpha.jpg",
        "images/charator/dream.jpg",
        "images/charator/mystic.jpg",
        "images/charator/apprentice.jpg ",
        "images/charator/aura.jpg",

        "images/charator/curator.jpg",
        "images/charator/paranormal.jpg",
        "images/charator/idiot.jpg",
        "images/charator/revealer.jpg",
        "images/charator/sentinel.jpg",
    ];
    //好坏人物分组（胜利判断）
    var evilCamp = ["1","2","15","16","17",];
    //循迹者数组
    var powerMan = ["4","8","9","10","14","15","17","18","21","22"]
    //人物序号
    var charatorNumber = [
        "化身幽灵",   // 0
        "狼人",      // 1
        "狼人",       // 2
        "爪牙",       // 3
        "酒鬼",       // 4

        "失眠者",      // 5
        "守夜人",      // 6
        "守夜人",      // 7
        "强盗",      // 8
        "预言家",      // 9
        "捣蛋鬼",      // 10

        "村民",      // 11
        "村民",      // 12
        "村民",      // 13
        "女巫",      // 14
        "阿尔法狼",      // 15

        "贪睡狼",      // 16
        "狼先知",      // 17
        "见习预言家",      // 18
        "循迹者",      // 19
        "监护人",      // 20

        "灵异侦探",      // 21
        "村庄白痴",      // 22
        "揭秘者",      // 23
        "哨兵",      // 24
    ];
    //人物限制选牌参数
    var activeLimit = [
        [0,1, ,true],
        [0,1,,],
        [0,1,,],
        [0,0,,],
        [1,0,,],

        [0,0,,],
        [0,0,,],
        [0,0,,],
        [0,1, ,true],
        [2,1, ,true],

        [0,2, ,true],
        [0,0,,],
        [0,0,,],
        [0,0,,],
        [1,1,,true],

        [0,1,,true],
        [0,0,,],
        [ , ,1,true],
        [1,0,,],
        [0,0,,],

        [0,1, ,true],
        [0,2, ,true],
        [0,0,,],
        [0,1, ,true],
        [0,1, ,true]
    ];

    //人物语音
    var sound=[
        "化身幽灵，醒来，",
        "狼人，醒来，",
        "狼人，醒来，",
        "爪牙，醒来，",
        "酒鬼，醒来，",

        "失眠者，醒来，",
        "守夜人，醒来，",
        "守夜人，醒来，",
        "强盗，醒来，",
        "预言家，醒来，",

        "捣蛋鬼，醒来，",
        "村民，醒来，",
        "村民，醒来，",
        "村民，醒来，",
        "女巫，醒来，",

        "阿尔法狼，醒来，",
        "贪睡狼，醒来，",
        "狼先知，醒来，",
        "见习预言家，醒来，",
        "循迹者，醒来，",

        "监护人，醒来，",
        "灵异侦探，醒来，",
        "村庄白痴，醒来，",
        "揭秘者，醒来，",
        "哨兵，醒来，",

        "如果化身幽灵复制了上一个角色，醒来"
    ];

    var btnBox=[
        ["确定","重置"],
        ["顺时针","逆时针"],
        ["顺时针","逆时针"],
        ["确定","重置"],
        ["确定","重置"],

        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["场内","场外"],

        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],

        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],
        ["确定","重置"],

        ["确定","重置"],
        ["查看","放弃"],
        ["顺时针","逆时针"],
        ["确定","重置"],
        ["确定","重置"],

        ["确定","重置"]
    ];

    var msgBox=[
        "选择一名玩家，并复制他的身份",
        "以一名玩家开始发言，左顺右逆",
        "以一名玩家开始发言，左顺右逆",
        "已选定的牌是狼人",
        "选择一张场外的牌作为自己的身份",

        "你最后的身份是",
        "你们是一体的",
        "你们是一体的",
        "选择一名玩家，与他交换身份",
        "查看场内一张或场外两张牌",

        "交换另外两名玩家的身份",
        "你一无所知",
        "你一无所知",
        "你一无所知",
        "查看场外的一张牌，并与另一名玩家身份交换",

        "选择一名玩家，使他变成狼人",
        "你睡着了，找不到队友",
        "选择一名玩家，查看他的身份",
        "查看一张场外的牌",
        "已选定的是交换或查看过身份的玩家",

        "对一名玩家进行标记",
        "选择首次查看的目标",
        "选择全体玩家身份顺逆移动",
        "选择你想揭示的玩家",
        "使另一名玩家身份不能被换",
    ];

    //显示游戏人数相同的牌,并修改姓名
    var count =playerCharator.length-3;
        $(".desk").children().each(function(index,ele){
            if(index>=count){return false}
            $(ele).addClass("visable");
        });
    $("#charator-selector .name").text(players[0]);
    $(".desk .card p").each(function(index,ele){
        $(ele).text(players[index])
    });

    //打乱身份数组并即时调用

    (function upset(arr){
        for (var i = 1; i < arr.length; i++) {
            var random = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[random]] = [arr[random], arr[i]];
        }
    })(playerCharator);
    console.log(playerCharator);
    //复制到数组
    endCharator = playerCharator.slice(0);
    //根据身份设定语音文件和睁眼玩家顺序；
    var gameText = [];
    var playerOrder = [];

    if(playerCharator.indexOf("24")!= -1){
        gameText.push(sound[24]);
        playerOrder.push(playerCharator[playerCharator.indexOf("24")])
    }
    if(playerCharator.indexOf("0")!= -1){
        gameText.push(sound[0]);
        playerOrder.push(playerCharator[playerCharator.indexOf("0")])
    }
    if(playerCharator.indexOf("1")!= -1||playerCharator.indexOf("2")!= -1){
        gameText.push(sound[1]);
        playerOrder.push(playerCharator[playerCharator.indexOf("1")])
    }
    if(playerCharator.indexOf("15")!= -1){
        gameText.push(sound[15]);
        playerOrder.push(playerCharator[playerCharator.indexOf("15")])
    }
    if(playerCharator.indexOf("17")!= -1){
        gameText.push(sound[17]);
        playerOrder.push(playerCharator[playerCharator.indexOf("17")])
    }
    if(playerCharator.indexOf("3")!= -1){
        gameText.push(sound[3]);
        playerOrder.push(playerCharator[playerCharator.indexOf("3")])
    }
    if(playerCharator.indexOf("6")!= -1||playerCharator.indexOf("7")!= -1){
        gameText.push(sound[6]);
        playerOrder.push(playerCharator[playerCharator.indexOf("6")])
    }
    if(playerCharator.indexOf("9")!= -1){
        gameText.push(sound[9]);
        playerOrder.push(playerCharator[playerCharator.indexOf("9")])
    }
    if(playerCharator.indexOf("18")!= -1){
        gameText.push(sound[18]);
        playerOrder.push(playerCharator[playerCharator.indexOf("18")])
    }
    if(playerCharator.indexOf("21")!= -1){
        gameText.push(sound[21]);
        playerOrder.push(playerCharator[playerCharator.indexOf("21")])
    }
    if(playerCharator.indexOf("8")!= -1){
        gameText.push(sound[8]);
        playerOrder.push(playerCharator[playerCharator.indexOf("8")])
    }
    if(playerCharator.indexOf("14")!= -1){
        gameText.push(sound[14]);
        playerOrder.push(playerCharator[playerCharator.indexOf("14")])
    }
    if(playerCharator.indexOf("10")!= -1){
        gameText.push(sound[10]);
        playerOrder.push(playerCharator[playerCharator.indexOf("10")])
    }
    if(playerCharator.indexOf("22")!= -1){
        gameText.push(sound[22]);
        playerOrder.push(playerCharator[playerCharator.indexOf("22")])
    }
    if(playerCharator.indexOf("19")!= -1){
        gameText.push(sound[19]);
        playerOrder.push(playerCharator[playerCharator.indexOf("19")])
        if(playerCharator.indexOf("0")!= -1){
            gameText.push(sound[25]);
            playerOrder.push(playerCharator[playerCharator.indexOf("0")])
        }
    }
    
    if(playerCharator.indexOf("4")!= -1){
        gameText.push(sound[4]);
        playerOrder.push(playerCharator[playerCharator.indexOf("4")])
    }
    if(playerCharator.indexOf("5")!= -1){
        gameText.push(sound[5]);
        playerOrder.push(playerCharator[playerCharator.indexOf("5")])
        if(playerCharator.indexOf("0")!= -1){
            gameText.push(sound[25]);
            playerOrder.push(playerCharator[playerCharator.indexOf("0")])
        }
    }
    
    if(playerCharator.indexOf("23")!= -1){
        gameText.push(sound[23]);
        playerOrder.push(playerCharator[playerCharator.indexOf("23")])
        if(playerCharator.indexOf("0")!= -1){
            gameText.push(sound[25]);
            playerOrder.push(playerCharator[playerCharator.indexOf("0")])
        }
    }
    
    if(playerCharator.indexOf("20")!= -1){
        gameText.push(sound[20]);
        playerOrder.push(playerCharator[playerCharator.indexOf("20")])
    }
    

    //翻开身份函数
    function watch(){
        $("#charator-selector img").attr("src", src[playerCharator[num+3]])
        $("#next").removeAttr("disabled");
    }

    $("#charator-selector img").click(watch);

    $("#charator-selector button").click(function(){
        $("#charator-selector img").attr("src", "images/back.jpg");
        num++;
        $("#charator-selector .name").text(players[num]);
        $("#next").attr("disabled", "disabled");
        if(num >= count){gameStart()}
    });

    //身份按钮文字改变函数；
    function btnChange(str1,str2){
        if(str1){
            $("#confirm").text(str1)
        }
        if(str2){
            $("#reset").text(str2)
        }
    }

    //游戏开始
    function gameStart(){
        itemHide();   //身份牌选择隐藏
        changeVoice("天黑，请闭眼，天黑，请闭眼"); //第一句语音，并绑定ended事件监听递归计时
        $("#voiceAd")[0].addEventListener("ended",voiceListener);
    }

    function itemHide(){
        $("#charator-selector").hide();
        $("#header").show();
        $(".fixed-btn").show();
    }

    //事件计时
    var soundOrder=0;

    //监听函数
    function voiceListener(){
        if(soundOrder==0){
            changeVoice(gameText[soundOrder])//播放第一个语音
            //第一次改变header的信息和按钮
            charatorChange();
        }else{
            var tmpCount = setTimeout(function(){changeVoice(gameText[soundOrder])},17000);//17s后播放下一语音
            timeCount();//15秒开始计时 并改变header和按钮
        }
        //判断结束语音
        if(soundOrder >= gameText.length-1){
            $("#voiceAd")[0].removeEventListener("ended",voiceListener);
            setTimeout(function(){
                clearTimeout(tmpCount);
                changeVoice("天亮")
                $(".charator").text("天亮");
                $("#message").text("发言三轮，然后投出一名玩家");
                $(".under .guard").removeClass("guard");
                charatorEvent["_25"]();
                limitActive(1,1,1);
                console.log(endCharator);
            },16500);
        }else{
            soundOrder = order + 1;
        }
    }

    
    function charatorChange(){
        //改变header、按钮、选牌样式、事件
        if(order<playerOrder.length){
            $(".time").text(15);
            $(".charator").text(charatorNumber[parseInt(playerOrder[order])]);
            $("#message").text(msgBox[parseInt(playerOrder[order])]);
            cardReset();
            btnChange.apply(null,btnBox[parseInt(playerOrder[order])]);
            limitActive.apply(null,activeLimit[playerOrder[order]]);
            charatorEvent["_"+playerOrder[order]]();
        }
    }


    function timeCount(){
        //计时器递减
        var r = setInterval(function(){
            var text = parseInt($(".time").text())-1;
            if(text>=0){
                $(".time").text(text);
            }else{ //到零后清除计时器改变身份
                clearInterval(r);
                //改变header信息
                order++;
                charatorChange();
                
            }
        },1000)
    }


    //百度语音API自动播放
    function changeVoice(str){
        var zhText = encodeURI(encodeURI(str));
        var voiceUrl = "https://tsn.baidu.com/text2audio?tex="+zhText + "&lan=zh&cuid=onenightwerewolf&ctp=1&tok=24.66b9c218f5ba575a754ab36b4f92191b.2592000.1544245552.282335-14240357"
        $("#voiceAd").attr("src",voiceUrl);
        $("#voiceAd")[0].play();
    }
    
    //根据playerOrder确定卡牌绑定事件
    function btnUnbind(){
        $("#confirm").unbind("click");
        $("#reset").unbind("click");
    };

    //限制选牌函数（外部卡数，内部卡数，总数，是否限制自己）
    function limitActive(out,desk,all,self){
        var allActive = $(".under .active");
        var outActive = $(".out .active");
        var deskActive = $(".desk .active");
        if(all || (all===0)){
            if(outActive.length >= all) {
                $(".under img").each(function(ind,ele){
                    $(ele).addClass("disabled")
                });
            }else{
                $(".under img").each(function(ind,ele){
                    $(ele).removeClass("disabled")
                });
            };
        };
        if(out || (out===0)){
            if(outActive.length >= out) {
                $(".out img").each(function(ind,ele){
                    $(ele).addClass("disabled")
                });
            }else{
                $(".out img").each(function(ind,ele){
                    $(ele).removeClass("disabled")
                });
            };
        };
        if(desk || (desk===0)){
            if (deskActive.length >= desk) {
                $(".desk img").each(function(ind,ele){
                    $(ele).addClass("disabled")
                });
            }else{
                $(".desk img").each(function(ind,ele){
                    $(ele).removeClass("disabled")
                });
            };
        };
        if(self){
            var num = playerCharator.indexOf(playerOrder[order])-3;
            if(num>=0){
                $(".desk img").eq(playerCharator.indexOf(playerOrder[order])-3).addClass("disabled");
            }
        };
    }

    function cardReset(){
        $(".under img").each(function(ind,ele){
            $(ele).removeClass("disabled")
        });
        $(".under .card").each(function(ind,ele){
            $(ele).removeClass("active")
        });
    }

    //click事件代理
    $(".under").click(function(){
        if(event.target.tagName==="IMG"){
            $(event.target).parent().toggleClass("active")
            limitActive.apply(null,activeLimit[playerOrder[order]]);
        }

    })
  //身份技能函数
    var charatorEvent = {
        //化身幽灵
        _0: function(){
                alert('暂不支持该角色');
            },
        //狼人
        _1: function(){ 
                btnUnbind();
                $("#confirm").click(function(){
                    cardLists.index($(".under .active"));
                    if(cardLists.index($(".under .active"))!=-1){
                        eventOrder.push(cardLists.index($(".under .active")));
                        limitActive(0,0);
                    }
                    
                })
                $("#reset").click(function(){
                    cardLists.index($(".under .active"));
                    if(cardLists.index($(".under .active"))!=-1){
                        eventOrder.push(-cardLists.index($(".under .active")));
                        limitActive(0,0);
                    }
                })
                
            },
        //狼人
        _2: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    cardLists.index($(".under .active"));
                    if(cardLists.index($(".under .active"))!=-1){
                        eventOrder.push(cardLists.index($(".under .active")));
                    }
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardLists.index($(".under .active"));
                    if(cardLists.index($(".under .active"))!=-1){
                        eventOrder.push(-cardLists.index($(".under .active")));
                    }
                    btnUnbind();
                })
                
            },
        //爪牙
        _3: function (){
                btnUnbind();
                evilCamp.forEach(function(ele){
                    var index = playerCharator.indexOf(ele);
                    if(index>=3) {
                        $(cardLists[index]).addClass("active");
                    }
                })
            },
        //酒鬼
        _4: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    var ori = playerCharator.indexOf("4");
                    var tar = cardLists.index($(".under .active"));
                    var tmp;
                    tmp = endCharator[tar];
                    endCharator[tar]=endCharator[ori];
                    endCharator[ori]=tmp;
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset();
                })
                
            },
        //失眠者
        _5: function(){
                btnUnbind();
                alert("你最后的身份是"+charatorNumber[playerCharator.indexOf("5")]);
            },
        //守夜人
        _6: function(){
                btnUnbind();
            },
        //守夜人
        _7: function(){
                btnUnbind();
            },
            //强盗
        _8: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    var ori = playerCharator.indexOf("8");
                    var tar = cardLists.index($(".under .active"));
                    var tmp;
                    tmp = endCharator[tar];
                    endCharator[tar]=endCharator[ori];
                    endCharator[ori]=tmp;
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset();
                })
                
            },
            //预言家
        _9: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    var act = cardLists.index($(".desk .active"));
                    alert("他的身份是"+charatorNumber[endCharator[act]])
                    btnUnbind();
                })
                $("#reset").click(function(){
                    var act1 = cardLists.index($(".out .active"));
                    var act2 = cardLists.index($(".out .active").eq(1));
                    alert("这两张牌的身份是"+charatorNumber[endCharator[act1]]+"，"+charatorNumber[endCharator[act2]])
                    btnUnbind();
                })
            },
            //捣蛋鬼
        _10: function(){
                btnUnbind();
                var ori = cardLists.index($(".desk .active"));
                var tar = cardLists.index($(".desk .active").eq(1));
                $("#confirm").click(function(){
                    tmp = endCharator[tar];
                    endCharator[tar]=endCharator[ori];
                    endCharator[ori]=tmp;
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset()
                })
            },
            //女巫
        _14: function(){
                btnUnbind();
                var ori = cardLists.index($(".under .active"));
                var tar = cardLists.index($(".under .active").eq(1));
                $("#confirm").click(function(){
                    tmp = endCharator[tar];
                    endCharator[tar]=endCharator[ori];
                    endCharator[ori]=tmp;
                    alert("你查看的的牌是"+charatorNumber[endCharator[act1]]);
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset()
                })
            },
            //阿尔法狼
        _15: function(){
                btnUnbind();
                var ori = cardLists.index($(".under .active"));
                $("#confirm").click(function(){
                    endCharator[ori]="2";
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset()
                })
            },
            //贪睡狼
        _16: function(){
                btnUnbind();
            },
            //狼先知
        _17: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    var act = cardLists.index($(".desk .active"));
                    alert("他的身份是"+charatorNumber[endCharator[act]])
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset();
                })
            },
            //见习预言家
        _18: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    var act = cardLists.index($(".out .active"));
                    alert("这张牌的身份是"+charatorNumber[endCharator[act]])
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset();
                })
            },
            //循迹者
        _19: function(){
                btnUnbind();
                powerMan.forEach(function(ele){
                    var index = playerCharator.indexOf(ele);
                    if(index>=3) {
                        $(cardLists[index]).addClass("active");
                    }
                })
            },
            //监护人
        _20: function(){
                alert('暂不支持该角色');
            },
            //灵异侦探
        _21: function(){
                 alert('暂不支持该角色');
            },
            //村庄白痴
        _22: function(){
                btnUnbind();
                $("#confirm").click(function(){//数组右移
                    var temp = [],tmp;
                    tmp = endCharator[endCharator.length-1];
                    temp = endCharator.slice(0,-1);
                    temp.unshift(tmp);
                    btnUnbind();
                })
                $("#reset").click(function(){//数组左移
                    var temp = [],tmp;
                    tmp = endCharator[0];
                    temp = endCharator.slice(1);
                    temp.push(tmp);
                    btnUnbind();
                })
            },
            //揭秘者
        _23: function(){
                alert('暂不支持该角色');
            },
            //哨兵
        _24: function(){
                btnUnbind();
                $("#confirm").click(function(){
                    $(".under .active").children("img").addClass("guard");
                    btnUnbind();
                })
                $("#reset").click(function(){
                    cardReset();
                })
            },
            //投票出局
        _25:function(){
                $("#confirm").click(function(){
                    var kill = cardLists.index($(".under .active"));
                    alert("他的身份是"+charatorNumber[endCharator[kill]])
                })
                $("#reset").click(function(){
                    cardReset();
                })
            }
        };

})

