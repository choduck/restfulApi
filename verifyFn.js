const RateLimit = require('express-rate-limit');

//특정시간 허용 횟수 제한 , 블랙리스트 등록 요구 사항 모듈 없음
exports.apiLimiter = new RateLimit({
    windowMs: 5*1000, 
    max: 3,
    //delayMs: 10,
    handler(req, res) {
      res.send({
        code: 429, // 기본값 429
        message: '5초에 3번만 요청할 수 있습니다.',
      });
    },
  });

  //특정시간 허용 횟수 제한 , 블랙리스트 등록 요구 모듈 있음
  exports.apiLimiter2 = new RateLimit({
    windowMs: 10*1000, 
    max: 5,
    
    //특정시간 허용 횟수 초과시 블랙리스트 등록 
    handler(req, res) {
      
      var key = req.body.connect_key + ':::' + res.user_id;

      //5분동안 이용제한  ==> 나중에 숫자는 바꿔주세요...
      req.redis.setex(key, 0.5*60, res.user_id, function(err, result) {
        console.log('redis result setex =======> ',result); 
      });

      req.redis.get(key, (err, reply) => {
        console.log('redis =======> ',reply); 
      
        res.noti_tp = '0';
        // 블랙리스트 등록을 tr통해 알림 
        var ac171 = require('./src/ac171.js');			
        ac171.onRun(req,res);
    
      });


      res.send({
        code: 429, // 기본값 429
        message: '10초에 5번만 요청할 수 있습니다.',
      });
    },
  });
 
  // user가 해당 api 이용가능 여부 체크 로직 
  exports.verifyApiKey = (req, res, next) => {
    try {
      
      var key = req.body.connect_key;

      if(key == null || key == 'undefined'){

        return res.send({
          code: 401,
          message: 'API Key가 없습니다',
        });

      }
      
      
      // access key를 보내면 response로 암호화된 user id와 api 이용목록을 받는다. 
      var ac532 = require('./src/ac532.js');			
      
      ac532.onRun(key,res,(blockData0)=>{
        
        var dataObj = {};
        for (var i=0; typeof blockData0 != 'undefined' && i< blockData0.length; i++)
        {
          
          // mca를 통해 user id와 api 이용목록을 받는다.
          dataObj = blockData0[i];
          
          //request한 커넥션 키값 비교 
          if(dataObj.connect_key != key){ 
             
            return res.send({
               code: 401,
               message: '유효하지 않은 API Key입니다',
             });

          }else{
             res.user_id = dataObj.user_id;
             res.use_api = dataObj.use_api;
             
             console.log('res.user_id ====>',res.user_id); 
             console.log('res.use_api ====>',res.use_api); 
             next();       
          } 

        }
      
      });
      
      
    } catch (error) {
      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 API Key입니다',
      });
    }
  };

  // 블랙리스트 등록 여부 체크
  exports.checkBlackList = (req, res, next) => {
    try {
      
      // 커넥션 키값을 셋팅한다.
      var key = req.body.connect_key; 

      var rtnStr ='';

      // connect_key값으로 조회한다.
      req.redis.get(key, (err, reply) => {
        console.log('redis =======> ',reply); 
      
        if(reply == null){
          rtnStr = '0';
          next();  

        }else { 
          console.log('rtnStr =======> ',rtnStr); 
          return res.status(401).json({
            code: 401,
            message: '사용 제한 ID입니다. '
          });
        
        }
      });

    } catch (error) {
      return res.status(401).json({
        code: 401,
        message: '사용자 체크 모듈 실행 중 에러가 발생하였습니다',
      });
    }
  };

