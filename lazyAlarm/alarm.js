/*
todo:
if you delete all alarms, spawn a new one
regexp, allow description in beginning too
update logo
"active" style for alarms
Help minimizes to top
*/

window.log=function(){var a="history";log[a]=log[a]||[];log[a].push(arguments);window.console&&console.log[console.firebug?"apply":"call"](console,Array.prototype.slice.call(arguments))};window.logargs=function(a){log(a,arguments.callee.caller.arguments)};

Storage.prototype.setObject = function(key, value) { this.setItem(key, JSON.stringify(value)); }

Storage.prototype.getObject = function(key) {
  var item = this.getItem(key);
  if (item) return JSON.parse(item);
}

if (!Array.prototype.forEach){
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
    var len = this.length >>> 0;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        fun.call(thisp, this[i], i, this);
    }
  };
}

function durationHMS(seconds,depth){
  var ret = [], prefix = '';
  if (seconds == 0) { return '0'; }
  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
	var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
	var y = [ 'D'                    , 'h'                     , 'm',                  's'  ];
	for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
  else return prefix + ret.join('');
}


function Alarm(initialData){
  var self = this;
  initialData = initialData ||
    {startTime: '', endTime: '', input: '', description: '', enabled: true, valid: false, priority: 0, repeat: false, url:'' };
  for (var key in initialData){
    this[key] = initialData[key];
  }

  this.html = '<li>'
    +'<div>'
    +'<input class="enabled" type="checkbox" />'
    +'<input class="entry" type="text" value="'+self.input+'" placeholder="start typing here" tabindex="5"/>'
    +'</div>'
    +'<div>'
    +'<span class="start time"></span>'
    +'<span class="end time"></span>'
    +'<span class="toDurationHMS time" rel=""></span>'
    +'</div>'
    +'<div>'
    +'<span class="feedback"></span>'
    +'<a href="#delete" class="delete button" title="Delete">[X]</a>'
    +'</div>'
    +'</li>';
  this.jQuery = $(this.html);
  this.toObject = function() {
    return {
      startTime   : +self.startTime,
      endTime     : +self.endTime,
      input       : self.input,
      description : self.description,
      enabled     : self.enabled,
      valid       : self.valid,
      priority    : self.priority,
      repeat      : self.repeat,
      url         : self.url,
    };
  }
  // output debug messages
  this.say = function(message){
    var text = $('<div/>').text(message).html();  // htmlentities
    text = text.replace(/(repeat|!+)/g,'<em>$1</em>');
    text = text.replace(/\b((https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|])/i,'<a href="$1">[URL]</a>');
    $('span.feedback',self.jQuery).html(text);
  };
  // updates html
  this._update = function(){
    if (self.enabled) self.enable();
    else              self.disable();

    if (self.startTime) {
      $('span.start',self.jQuery).text(new Date(self.startTime).toTime());
    } else {
      $('span.start',self.jQuery).text('');
    }

    var ctime = self.endTime;
    if (ctime) {
      $('span.end',self.jQuery).text(new Date(ctime).toTime());
      $('span.toDurationHMS',self.jQuery).attr('rel',ctime);
    } else {
      $('span.end',self.jQuery).text('');
      $('span.toDurationHMS',self.jQuery).removeAttr('rel').text('');
    }

    self.say(self.description);
  };
  // on change event handler
  this.__changeEnable = function(e){
    //todo: use 'this' for efficiency
    //log($(this).is(':checked'));
    //if ($('input.enabled',self.jQuery).is(':checked')) self.enable();
    if ($(this).is(':checked')) self.enable();
    else self.disable();

    self._save();
  };
  // on change event handler
  this.__changeTime = function(){
    //initialize
    self.startTime = '';
    self.endTime   = '';
    self.description = '';
    //self.enabled   = $('input.enabled',self.jQuery).is(':checked');
    self.valid     = false;
    var input      = self.input = $('input.entry',self.jQuery).val();
    self.priority  = 0;
    self.repeat    = false;
    self.url       = '';

    var timer = /((\d+)h)?\s?((\d+)m)?\s?((\d+)s)?(.+)?/i;
    // 2:hour, 4:minute, 6:seconds, 7 : description
    var alarm = /(\d{0,2})(:(\d\d))?\s?((a|p)m?)?(.+)?/i;
    // 1:hour, 3:minute, 5:am/pm, 6:description
    var isTimer = input.match(timer);
    var isAlarm = input.match(alarm);
    if (isTimer && isTimer[2] || isTimer[4] || isTimer[6]) {
      if (isTimer[7]) self.description = $.trim(isTimer[7] || '');
      var seconds = +(isTimer[2] || 0) * 3600
        + (+(isTimer[4] || 0)) * 60
        + (+(isTimer[6] || 0));
      var now = self.startTime = +Date.now();
      self.valid = true;
      self.startTime = +Date.now();
      self.endTime = +(new Date(now + seconds*1000));
    } else if (isAlarm && isAlarm[1]) {
      var hour   = +isAlarm[1];
      var minute = +(isAlarm[3] || 0);
      if (isAlarm[6]) self.description = $.trim(isAlarm[6] || '');
      if (isAlarm[5] == 'p' && hour < 12) hour += 12;
      if (isAlarm[5] == 'a' && hour == 12) hour = 0;
      var now = new Date();
      self.startTime = +now;
      var alarm = +(new Date(now.getFullYear(),now.getMonth(),now.getDate(),hour,minute));
      if (alarm < self.startTime) alarm += 86400000; // roll over to next day
      self.valid = true;
      self.startTime = +Date.now();
      self.endTime = alarm;
    } else {
      self.say('not a valid alarm');
    }
    //parse description
    if (self.valid) {
      self.priority = self.description.length - self.description.replace(/!/g,'').length;
      self.repeat   = self.description.indexOf('repeat') != -1;
      var url       = self.description.match(/\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[A-Z0-9+&@#\/%=~_|]/i);
      if (url) self.url = url[0];


      //todo <em> ! and repeat in the self.say
      self.jQuery.removeClass('error');
      self.enable();
    }
    else self.jQuery.addClass('error');

    self._update();
    self._save();
  };
  
  this._save = function(){
    myAlarms.save();
  };
  
  this.enable = function(){
    self.enabled = true;
    $('input.enabled',self.jQuery).attr('checked','checked');
    self.jQuery.removeClass('disabled');
  };
  this.disable = function(){
    self.enabled = false;
    $('input.enabled',self.jQuery).removeAttr('checked');
    self.jQuery.addClass('disabled');
  };
  this.init = function(){
    self.say('Alarm Initialized');
    $('input.enabled',self.jQuery).change(self.__changeEnable);
    $('input.entry',self.jQuery)
      .change(self.__changeTime)
      .dblclick(function(){ log('hi'); self.enable(); self.__changeTime(); });
    $('a.delete',self.jQuery).click(function(){
      self._destroy();
      return false;
    });
    self._update();

    myAlarms.alarms.push(self);
    $('#alarms > ul').append(self.jQuery);
  };
  this._destroy = function(){
    for (var i = myAlarms.alarms.length - 1; i >= 0; --i){
      if (myAlarms.alarms[i] == self) {
        myAlarms.alarms.splice(i, 1);
        break;
      }
    }
    self._save();
    self.jQuery.remove();
    delete self;
  };

  this.init();
}

function update(){
  var now = new Date();
  $('#time').text(now.toTime());
  now = +now;
	$(".toDurationHMS").each(function(){
    var end = this.getAttribute('rel');
    if (end && end != '0') this.innerHTML = durationHMS((end-now)/1000);
    else this.innerHTML = '';
  });
  var closest = 0;
  var description = '';

  if (!myAlarms.alarms.length) alarms.add();

  myAlarms.alarms.forEach(function(alarm){
    // check for closest
    if (alarm.valid && alarm.enabled && (alarm.endTime > now)) {
      if (!closest || closest > alarm.endTime) {
        closest = alarm.endTime;
        description = alarm.description;
      }
    }
    // check for alarm to set
    if (alarm.valid && alarm.enabled && (alarm.endTime < now) && (alarm.endTime > now-2000)) {
      if (alarm.repeat) {
        alarm.__changeTime();
      } else {
        alarm.disable();
        alarm._save();
      }
      log(alarm.url, '&,',!alarm.repeat, '|',alarm.startTime-alarm.endTime);
      if (alarm.url && (!alarm.repeat || ((alarm.endTime-alarm.startTime) > 60000))) {
        window.open(alarm.url);
      }
      myAlarms.play(alarm.priority);
    }
  });
  var lastAlarm = myAlarms.alarms[myAlarms.alarms.length-1];
  if (lastAlarm && lastAlarm.input && lastAlarm.valid) myAlarms.add();

  if (closest) {
    document.title = 'Alarm - ' + durationHMS((closest-now)/1000) + ' ' + description;
  } else if (document.title != 'Alarm') {
    document.title = 'Alarm';
  }
  
  setTimeout(update,1000);
}



var myAlarms = {
  alarms : [],
  add : function(){
    var temp = new Alarm();
    this.save();
    return temp;
  },
  save : function(){
    var saveObj = [];
    this.alarms.forEach(function(alarm){
      saveObj.push(alarm.toObject());
    });
    localStorage.setObject('alarms',saveObj);
  },
  load : function(){
    var loadObj = localStorage.getObject('alarms') || [];
    loadObj.forEach(function(alarm){
      new Alarm(alarm);
    });
  },
  play : function(priority){
    var alarmAudio = $('#audio audio');
    priority = priority || 0;
    priority = Math.min(priority,alarmAudio.length - 1);
    alarmAudio[priority].play();
  },
  updateHTML : function(){
    myAlarms.alarms.forEach(function(alarm){
      alarm._update();
    });
  },
  destroy : function(){
    myAlarms.alarms.forEach(function(alarm){
      alarm._destroy();
    });
  },
};

function pickHourFormat(type){
  function pad(number){
    if (number < 10) return '0' + number;
    else return number;
  }
  if (!type) {
    var prefs = localStorage.getObject('preferences');
    type = prefs && prefs.hourFormat;
  }
  if (type == 24) {
    Date.prototype.toTime = function(){
      return this.getHours() + ':' + pad(this.getMinutes()) + ':' + pad(this.getSeconds());
    };
  } else {
    Date.prototype.toTime = function(){
      var hour = this.getHours();
      var m = 'A';
      if (hour == 0)   hour  = 12;
      if (hour > 12) { hour -= 12; m = 'P'; }
      return hour + ':' + pad(this.getMinutes()) + ':' + pad(this.getSeconds()) + m;
    };
  }
}

//browser detection
if ($.browser.msie) {
      $("<div class='ie'>This site relies on technologies found in HTML5, and does not run properly in Internet Explorer at this time.</div>").appendTo($('#top'));
} else {
  //hook up UI
  $('#addAlarm').click(function(){
    myAlarms.add();
    return false;
  });
  $('#audio a.preview').click(function(){
    var audio = $(this).next()[0];
    audio.play();
    return false;
  });
  $(document).bind('keyup',function(e){
    if (e.keyCode == 27) {
      $('#audio audio').each(function(){
        this.pause();
      });
    }
  });
  $('#time-24').click(function(){
    var prefs = localStorage.getObject('preferences') || {};
    prefs.hourFormat = 24;
    localStorage.setObject('preferences',prefs);
    pickHourFormat(24);
    myAlarms.updateHTML();
    update();
    return false;
  });
  $('#time-12').click(function(){
    var prefs = localStorage.getObject('preferences') || {};
    prefs.hourFormat = 12;
    localStorage.setObject('preferences',prefs);
    pickHourFormat(12);
    myAlarms.updateHTML();
    update();
    return false;
  });
  $('#resetAll').click(function(){
    delete localStorage.preferences;
    delete localStorage.alarms;
    myAlarms.destroy();
    return false;
  });
  $('section[id] h1').click(function(){
    var section = $(this).closest('section');
    var prefs = localStorage.getObject('preferences') || {};
    prefs[section.attr('id')] = section.hasClass('hide');
    localStorage.setObject('preferences',prefs);
    section.toggleClass('hide');
  });

  // main
  pickHourFormat();
  (function(){
    var prefs = localStorage.getObject('preferences') || {};
    $('section[id] h1').each(function(){
      var section = $(this).closest('section');
      var id = section.attr('id');
      if (prefs[id] === false) {
        section.addClass('hide');
      }
    });
  })();
  myAlarms.load();
  update();
}
