// phina.js をグローバル領域に展開
phina.globalize();

const ASSETS = {
  image: {
    bg: "http://jsrun.it/assets/a/G/5/Y/aG5YD.png"
    , home:"./home.png"
    , START:"./START.png"
    , kyara1:"./kyara1.png"
    , waku:"./waku.png"
    , tomapiko: 'http://cdn.rawgit.com/phi-jp/phina.js/v0.2.0/assets/images/tomapiko_ss.png'
    , jibaku: "./jibaku-2.png"
    , kaifuku: "./kaifuku-2.png"
    , kougeki: "./kougeki-2.png"
  },
};

var MESSAGE_SPEED = 4; //1<n 低いほど早い
var FONT_SIZE = 50;

// 画面は16:9で作る
const SCREEN = {
  WIDTH : 960        // スクリーン幅
  , HEIGHT : 540    // スクリーン高さ
};

var TEXTS = [
      '自分:(この人(?)だれだろ)',
      '???:何？',
      '自分:(やゔぁいやつだこいつ)',
      '???:あのさ',
      '自分:？',
      '???:なにかあるの？',
      '自分:(なんて答えればいいんだろう・・・)',
      '???:早く答えろよ',
      '自分:あの..出口を教えてほしいのですが..',
      '???:んなもんあるわけねえだろボケ',
      '???:そーゆーのは戦いに勝ってから言えや(`・^・´)',
      '自分:(あわわわ戦いってポケ〇ンとかモン〇ンとかそういうのか..?)',
      '???:バトルスタート！！(`•口•´)'
    ];

// TitleScene クラスを定義
phina.define('TitleScene', {
    
  superClass: 'DisplayScene',
  
  // 初期化
  init: function(options) {
    // super init
    this.superInit(options);
    
    
    // 背景色を指定
    //this.backgroundColor = '#444';
    
    // 背景
    this.bg = Sprite("home").addChildTo(this);
    this.bg.origin.set(0, 0); // 左上基準に変更
    
    // ラベルを生成
    //this.label = Label('Hello, phina.js!').addChildTo(this);
    //this.label.x = this.gridX.center(); // x 座標
    //this.label.y = this.gridY.center(); // y 座標
    //this.label.fill = 'white'; // 塗りつぶし色
  
    let start = Sprite('START', 150, 125).addChildTo(this);  
    start.x = 480;
    start.y = 400;
    start.setInteractive(true);
    start.onpointend = () => {
        console.log("押されたよ〜w")
        this.exit();
    };
  },
});

phina.define('MainScene',{
  superClass:'DisplayScene',
  
  init:function(opt){
    this.superInit(opt);
    
    let kyara1 = Sprite('kyara1', 250, 250).addChildTo(this);  
    kyara1.x = 480;
    kyara1.y = 100;
    kyara1.setInteractive(true);
    kyara1.onpointend = () => {
      console.log("押されたよ〜w")
      this.exit();
    };
    // 背景色を指定
    this.backgroundColor = '#000';
    
    this.labelArea = LabelArea({
      text:'',
      width:600,
      height:150,
      stroke:'white',
      fill:'white',
      fontSize:FONT_SIZE,
    }).addChildTo(this)
    .setPosition(this.gridX.center(),this.gridY.center(2));
    
    RectangleShape({
      cornerRadius:15,
      width:600,
      height:175,
      strokeWidth:15,
      stroke:'white',
      fill:'transparent',
    }).addChildTo(this.labelArea);
    
    this.texts = TEXTS;
    this.textIndex = 0;
    this.charIndex = 0;
    
    this.nextTriangle = TriangleShape({
      fill:'white',
      stroke:'transparent',
      radius:FONT_SIZE/2,
    }).addChildTo(this)
    .setPosition(this.labelArea.right - 25, this.labelArea.bottom - 25);
    
    this.nextTriangle.rotation = 180;
    
    this.nextTriangle.hide();
    
    this.messageSpeed = MESSAGE_SPEED;
  },
  
  update:function(app){
    if(app.pointer.getPointingStart()){
      if(this.textAll){
        this.nextText();
      }
      else{
        this.showAllText();
      }
    }
    else if(app.frame % this.messageSpeed === 0){
      this.addChar();
    }
    
    if(this.textAll){
      if(app.frame % 8 === 0){
        if(this.nextTriangle.visible){
          this.nextTriangle.hide();
        }else{
          this.nextTriangle.show();
        }
      }
    }else{
      this.nextTriangle.hide();
    }
  },
  
  showAllText: function(){
    var text = this.texts[this.textIndex];
    this.labelArea.text = text;
    this.textAll = true;
    this.charIndex = text.length;
  },
  
  clearText:function(){
    this.labelArea.text='';
  },
  
  nextText : function(){
    this.clearText();
    if(this.texts.length <= ++this.textIndex){
      // 用意した文章が全部表示された
      // TODO: バトルシーンに遷移する
      //↑おｋですm(_ _)m
      this.textIndex = 0;
      this.exit();
    }
    this.charIndex = 0;
    this.addChar();
  },
  
  addChar:function(){
    this.labelArea.text += this.getChar();
  },
  
  getChar:function(){
    var text = this.texts[this.textIndex];
    if(text.length <= this.charIndex){
      this.textAll = true;
      return '';
    }else{
      this.textAll = false;
      return text[this.charIndex++];
    }
  }
});

phina.define('PrologueScene', {
    
  superClass: 'DisplayScene',
  
  // 初期化
  init: function(options) {
　　// super init
    this.superInit(options);
    
    let kyara1 = Sprite('kyara1', 500, 500).addChildTo(this);  
    kyara1.x = 480;
    kyara1.y = 180;
    kyara1.setInteractive(true);
    kyara1.onpointend = () => {
        console.log("押されたよ〜w")
        this.exit();
    };
    
    let waku = Sprite('waku', 500, 225).addChildTo(this);  
    waku.x = 480;
    waku.y = 440;
    waku.setInteractive(true);
    // 背景色を指定
    this.backgroundColor = '#000';
    
    // 1秒後に1回だけ処理
    setTimeout(() => {
      
      let label = Label({
        text: ''
        , fontSize: 47
        , width: 100
      }).addChildTo(this).setPosition(480, 400);
      
      // メッセージを表示
      message(label, MESSAGE.kyara1[0], () => {
        // 終わったときの処理
        message(label, MESSAGE.kyara1[1], () => {
          // 終わったときの処理
         this.exit();
        });
      });
      
    }, 1 * 1000);
    
    // 来週はこれをパクる！ → パクリ完了（11/28）
    // http://runstant.com/simiraaaa/projects/LabelAreaSample
  }
});

phina.define('BattleScene',{
  superClass:'DisplayScene',
  
  init:function(opt){
    this.superInit(opt);
    this.backgroundColor = '#000';
    
    let kougeki = Sprite('kougeki').addChildTo(this);  
    kougeki.x = 150;
    kougeki.y = 60;
    kougeki.setInteractive(true);
    kougeki.onpointend = () => {
      alert("攻撃！");
    };
    
    let kaifuku = Sprite('kaifuku').addChildTo(this);  
    kaifuku.x = 150;
    kaifuku.y = 260;
    kaifuku.setInteractive(true);
    kaifuku.onpointend = () => {
      alert("回復！")
    };
    
    let jibaku = Sprite('jibaku',).addChildTo(this);  
    jibaku.x = 150;
    jibaku.y = 460;
    jibaku.setInteractive(true);
    jibaku.onpointend = () => {
      alert("じばk..(ドーン)")
    };
    
    
    let kyara1 = Sprite('kyara1', 500, 500).addChildTo(this);  
    kyara1.x = 600;
    kyara1.y = 250;
    
  }
})
// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'battle'     // ココで指定したシーンから開始する
    , width: SCREEN.WIDTH   // 画面幅
    , height: SCREEN.HEIGHT // 画面高さ
    , assets: ASSETS        // アセット読み込み
    , scenes: [
        // title
        {
          label: 'title'
          , className: 'TitleScene'
        },
        // Prologue
        {
          label: 'prologue'
          , className: 'PrologueScene'
        },
        
        {
          label:'main'
          ,className:'MainScene'
        },
        
        {
          label:'battle'
          ,className:'BattleScene'
        }
        // ...
      
      ]
  });
  
  app.enableStats();
  
  // アプリケーション実行
  app.run();
});








//次回までの宿題の欄
//(12/5)次回までにボタンを表示するのと、ボタンの位置を変更する。&東大受かるｗ