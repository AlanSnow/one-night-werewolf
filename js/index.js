$(document).ready(function(){
    //玩家姓名数组
    var players=[
        "player1", "player2", "player3",
        "player4", "player5", "player6",
        "player7", "player8", "player9",
        "player10", "player11", "player12",
    ];

    
    var originName=[
        "player1", "player2", "player3",
        "player4", "player5", "player6",
        "player7", "player8", "player9",
        "player10", "player11", "player12",
    ];

    //身份对应数组
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

    //玩家身份数组
    /*var playerCharator = [
        "outside1", "outside2", "outside3",
        "player1", "player2", "player3",
        "player4", "player5", "player6",
        "player7", "player8", "player9",
        "player10", "player11", "player12",
    ];*/

    var playerCharator = [
        1,3,4,8,9,11,
    ];

    //默认玩家身份数组
    var origin={
        _3:[
            1,3,4,8,9,11,
        ],
        _4:[
            1,3,4,8,9,10,11,
        ],
        _5:[
            1,3,4,8,9,10,11,12,
        ],
        _6:[
            1,2,3,4,8,9,10,11,12,
        ],
        _7:[
            1,2,3,4,5,8,9,10,11,12,
        ],
        _8:[
            1,2,3,4,5,6,7,8,9,10,11,
        ],
        _9:[
            1,2,3,4,5,6,7,8,9,10,11,12
        ],
        _10:[
            1,2,3,4,5,6,7,8,9,10,11,16,17
        ],
        _11:[
            1,2,3,4,5,8,9,10,11,12,16,17,18,24,
        ],
        _12:[
            1,2,3,4,5,8,9,10,11,12,15,16,17,18,24,
        ],
    }

    //导航栏toggle
    $(".navbar-toggler").click(function(){
        $(this).toggleClass("collapsed");
        $("#main-menu").toggle();
    });

    //滑动条change函数
    function rangeChange() {
        var cardNumber;
        cardNumber=parseInt($("#peopleNumber").val())+3;
        $("#numberSrc").text($("#peopleNumber").val());
        $("#cardNumber").text(cardNumber);
    }


    //滑动条change监控
    $("#peopleNumber").change(function(){
        rangeChange();
        playerCharator=origin["_"+$(this).val()].slice(0);
        cardChange();   
        inputChange();
        startChange();
    });

    //修改激活身份牌
    function cardChange(){
        var lists=$("#charator-selector").children();
        lists.removeClass("active");
        playerCharator.forEach(function(ele){
            $(lists[ele]).addClass("active")
        })
    }

    //修改玩家姓名输入框数量
    function inputChange(){
        var len = playerCharator.length;
        var lists = $("#playerName").children();
        lists.each(function(index,ele){
            $(ele).removeClass("active");
        });
        for(var i = 0; i < len-3; i++){
            $(lists[i]).addClass("active");
        }
    }

    //修改确认信息
    function startChange(){
        var str=[];
        for(var i = 0; i < playerCharator.length; i++){
            str[i]=charatorNumber[playerCharator[i]]
        }
        $("#charatorString").text(str.join("、")+"，共"+playerCharator.length+"张牌。");
    }

    //身份牌点击事件代理
    $("#charator-selector").click(function(){
        if(event.target.tagName==="IMG"){
            var target=$(event.target);
            var index;
            var num=$("#charator-selector img").index(target);
            if(target.hasClass("active")){
                //身份数组删除该牌
                index=playerCharator.indexOf(num);
                target.removeClass("active");
                playerCharator.splice(index,index+1);
            }else{
                //身份数组添加该牌
                target.addClass("active");
                playerCharator.push(num);
            }
            //滑动条变化
            $("#peopleNumber").val(playerCharator.length-3);
            rangeChange();
            inputChange();
            startChange();
            
        }
    })  


    //玩家姓名保存和重置
    $("#nameSave").click(function(){
        $("#playerName").find("input").each(function(index,ele){
            if(ele.value) {
                players[index]=ele.value;
            }
        })
    })

    $("#nameReset").click(function(){
        var cf = confirm("注意！此操作会清除全部玩家姓名")
        if(cf){
            $("#playerName").find("input").each(function(index,ele){
                ele.value="";
            })
            players=originName.slice(0);
        }
    })

    

    //游戏开始切页面传参
    $("#gameStartBtn").click(function(){
        var url="game.html?players=" + escape(JSON.stringify(players)) + ";playerCharator=" + escape(JSON.stringify(playerCharator));
        window.location.href=url;
    })
})