;(function($){
        $.fn.extend({
            inputs:function(options){
                var defaults = {
                    inpParent: this,
                }
                options = {};
                var str = '';
                var option = $.extend({},defaults,options);


                  // 判断系统是ios还是android
                  var u = navigator.userAgent;
                  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

                  //  ios 系统
                  if(isiOS){
                    // 显示input元素
                    option.inpParent.css({'display': 'block','top': '50%','marginTop': -250})
                  }else if(isAndroid == true){ //  android 系统
                    andriodM()
                  }



                  function andriodM(){
                     //一个input的高度
                    var inpHeight = option.inpParent.find('input').outerHeight(true);
                    // input父级的高度
                    var inpFatherHeight = option.inpParent.height();
                    // 加载后窗口的高度 
                    var windowHeightFull = $(window).height();

                    // option.inpParent.css({'top':50,marginTop:0})


                    // 初始值
                    var oldId = 0;
                    var newId = 0;
                    var step = 1;
                    var resizeWindowHeightStorage = 300;

                    option.inpParent.find('input').on('focus',function(){
                        newId = Number($(this).attr('ids'));
                        var nowWindowHeight = resizeWindowHeightStorage;
                        var num = Math.floor(nowWindowHeight/inpHeight) - 3;
                        var fatherTop = parseInt(option.inpParent.css('top'));
                        flag();
                        function flag(){
                          if(newId == oldId){
                            return;
                          }else{
                            if(newId >= num && num != -3){
                              if(oldId == 0 && step == 1){
                               // 改变最外侧的margin-top值
                                option.inpParent.stop().animate({
                                  'top':fatherTop-3*inpHeight,
                                  'marginTop': 0 
                                },500,function(){
                                  option.inpParent.css({
                                    'top':fatherTop-3*inpHeight, 
                                    'marginTop': 0
                                  })
                                  oldId = newId;
                                })
                              }else{
                                // $('.inp').eq(3).val(option.inpParent.css('top'))
                                // 改变最外侧的margin-top值
                                option.inpParent.stop().animate({
                                  'top':fatherTop-(newId - oldId)*inpHeight,
                                  'marginTop': 0 
                                },500,function(){
                                  option.inpParent.css({
                                    'top':fatherTop-(newId - oldId)*inpHeight, 
                                    'marginTop': 0
                                  })
                                  // $('.inp').eq(1).val(newId)
                                  // $('.inp').eq(2).val(oldId)
                                  // $('.inp').eq(4).val(option.inpParent.css('top'))
                                  
                                  oldId = newId;
                                })
                              }
                                
                            }else{
                                option.inpParent.stop().animate({'top':50,'marginTop': 0},500)
                                oldId = newId;
                            }
                          }
                        }
                      })

                    // 改变窗口的大小
                    resize();
                    function resize(){
                      $(window).on('resize',function(){
                        if(step == 1){
                          // 存储软键盘调出时的屏幕高度
                          resizeWindowHeightStorage = $(window).height();
                        }
                        resizeWindowHeight = $(window).height();
                        step++;
                        // 软键盘收起时的动画效果
                        if(resizeWindowHeight == windowHeightFull){
                          option.inpParent.stop().animate({'top': '50%','marginTop': -inpFatherHeight/2},500,function(){
                            option.inpParent.find('input,textarea').blur()
                            option.inpParent.css({
                              'top': '50%',
                              'marginTop': -inpFatherHeight/2
                            })
                            oldId = newId = 0;
                          })
                        }
                      })
                    }
                  }
              }
            })
    })(jQuery)