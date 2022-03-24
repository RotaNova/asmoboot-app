const GetDate = {
  withData: (num) => {
		let param = parseInt(num);
    return param < 10 ? '0' + param : '' + param;
  },
  getTimes(str){
		var strs = str.split(' ');
		var strs1 = strs[0] ? strs[0].split('-') : '2000-01-01'.split('-');
		var strs2 = strs[1] ? strs[1].split(':') : '00:00:00'.split(':');
		var year = strs1[0] ? strs1[0] : 2000;
		var month = strs1[1] ? strs1[1] : 1;
		var day = strs1[2] ? strs1[2] : 1;
		var hour = strs2[0] ? strs2[0] : 0;
		var minute = strs2[1] ? strs2[1] : 0;
		var second = strs2[2] ? strs2[2] : 0;
		var newstr = year +'/'+ month +'/'+ day +' '+ hour +':'+ minute +':'+ second;
    return new Date(newstr.replace(/-/g,'/')).getTime();
  },
	getCurrentTimes(time = new Date()){
		const date = new Date(time);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return {
			detail: {
				year: year,
				month: month,
				day: day,
				hour: hour,
				minute: minute,
				second: second
			}
		}
	},
  format(arr){
    let curarr = [];
    let curarr0 = [];
    let str = '';
    arr.forEach((cur,index) => {
			let o = GetDate.withData(cur);
      if(index > 2){
        curarr.push(o);
      }else{
        curarr0.push(o);
      }
    })
    if(arr.length < 4){
      str = curarr0.join('-');
    }else{
      str = curarr0.join('-') + ' ' + curarr.join(':');
    }
    return str;
  },
	getCurrentStringValue(str){
		let newstr = str.split(' ');
		if(newstr && newstr[1]){
			let arr = [...newstr[0].split('-'),...newstr[1].split(':')];
			return arr;
		}
		return newstr[0].split('-');
	},
	getCompare(curp,startp,endp,timesp){
		let cur = GetDate.getTimes(curp);
		let start = GetDate.getTimes(startp);
		let end = GetDate.getTimes(endp);
		if(cur < start){
			return GetDate.getTimeIndex(timesp,GetDate.getCurrentStringValue(startp));
		}else if(cur > end){
			return GetDate.getTimeIndex(timesp,GetDate.getCurrentStringValue(endp));
		}else{
			return GetDate.getTimeIndex(timesp,GetDate.getCurrentStringValue(curp));
		}
	},
	getChooseArr(times,indexs){
		let arr = [];
		times.forEach((cur,index) => arr.push(cur[indexs[index]]));
		return arr;
	},
	getNewArray(arr){
		let newarr = [];
		arr.forEach(cur => newarr.push(cur));
		return newarr;
	},
  getLoopArray: (start, end) => {
    var start = start || 0;
    var end = end || 1;
    var array = [];
    for (var i = start; i <= end; i++) {
      array.push(GetDate.withData(i));
    }
    return array;
  },
  getMonthDay: (year, month) => {
    var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

    switch (month) {
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        array = GetDate.getLoopArray(1, 31)
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        array = GetDate.getLoopArray(1, 30)
        break;
      case '02':
        array = flag ? GetDate.getLoopArray(1, 29) : GetDate.getLoopArray(1, 28)
        break;
      default:
        array = GetDate.getLoopArray(1, 31)
    }
    return array;
  },
	getIndependentTimes(opts){
		var {
			startTimes,
			endTimes,
			curTimes,
			fields
		} = opts;
		var {
			year:startyear = 2021,
			month:startmonth = 1,
			day:startday = 1,
			hour:starthour = 0,
			minute:startminute = 0,
			second:startsecond = 0
		} = startTimes;
		var {
			year:endyear = 2021,
			month:endmonth = 1,
			day:endday = 1,
			hour:endhour = 0,
			minute:endminute = 0,
			second:endsecond = 0
		} = endTimes;
		var {
			year:curyear = 2021,
			month:curmonth = 1,
			day:curday = 1,
			hour:curhour = 0,
			minute:curminute = 0,
			second:cursecond = 0
		} = curTimes;
		return {
			startyear, 
			startmonth, 
			startday, 
			starthour, 
			startminute, 
			startsecond, 
			endyear, 
			endmonth, 
			endday, 
			endhour, 
			endminute, 
			endsecond, 
			curyear, 
			curmonth, 
			curday, 
			curhour, 
			curminute, 
			cursecond
		}
	},
	getYears(opts){
		var years = GetDate.getLoopArray(opts.startyear, opts.endyear);
		return years;
	},
	getMonths(opts){
		var months = GetDate.getLoopArray(1, 12);
		if(opts.curyear == opts.startyear){
			months = months.filter(cur => cur >= opts.startmonth);
		}
		if(opts.curyear == opts.endyear){
			months = months.filter(cur => cur <= opts.endmonth);
		}
		return months;
	},
	getDays(opts){
		var days = GetDate.getMonthDay(opts.curyear, GetDate.withData(opts.curmonth));
		if(opts.curyear == opts.startyear && opts.curmonth == opts.startmonth){
			days = days.filter(cur => cur >= opts.startday);
		}
		if(opts.curyear == opts.endyear && opts.curmonth == opts.endmonth){
			days = days.filter(cur => cur <= opts.endday);
		}
		return days;
	},
	getHours(opts){
		var hours = GetDate.getLoopArray(0, 23);
		if(opts.curyear == opts.startyear && opts.curmonth == opts.startmonth && opts.curday == opts.startday){
			hours = hours.filter(cur => cur >= opts.starthour);
		}
		if(opts.curyear == opts.endyear && opts.curmonth == opts.endmonth && opts.curday == opts.endday){
			hours = hours.filter(cur => cur <= opts.endhour);
		}
		return hours;
	},
	getMinutes(opts){
		var minutes = GetDate.getLoopArray(0, 59);
		if(opts.curyear == opts.startyear && opts.curmonth == opts.startmonth && opts.curday == opts.startday && opts.curhour == opts.starthour){
			minutes = minutes.filter(cur => cur >= opts.startminute);
		}
		if(opts.curyear == opts.endyear && opts.curmonth == opts.endmonth && opts.curday == opts.endday && opts.curhour == opts.endhour){
			minutes = minutes.filter(cur => cur <= opts.endminute);
		}
		return minutes;
	},
	getSeconds(opts){
		var seconds = GetDate.getLoopArray(0, 59);
		if(opts.curyear == opts.startyear && opts.curmonth == opts.startmonth && opts.curday == opts.startday && opts.curhour == opts.starthour && opts.curminute == opts.startminute){
			seconds = seconds.filter(cur => cur >= opts.startsecond);
		}
		if(opts.curyear == opts.endyear && opts.curmonth == opts.endmonth && opts.curday == opts.endday && opts.curhour == opts.endhour && opts.curminute == opts.endminute){
			seconds = seconds.filter(cur => cur <= opts.endsecond);
		}
		return seconds;
	},
  getDateTimes: (opts) => {
		var alltimes = GetDate.getIndependentTimes(opts);
		var years = GetDate.getYears(alltimes);
		var months = GetDate.getMonths(alltimes);
		var days = GetDate.getDays(alltimes);
		var hours = GetDate.getHours(alltimes);
		var minutes = GetDate.getMinutes(alltimes);
    var seconds = GetDate.getSeconds(alltimes);
    var times = {
			year: [years],
			month: [years, months],
			day: [years, months, days],
			hour: [years, months, days, hours],
			minute: [years, months, days, hours, minutes],
			second: [years, months, days, hours, minutes, seconds]
		};
    return times[opts.fields] || times.second;
  },
  getIndex(arr,target){
    let len = arr.length;
    for(let i = 0; i < len; i++){
      if(arr[i] == target){
        return i;
      }
    }
  },
  getTimeIndex(arrs, targets){
    let len = arrs.length;
    let arr = [];
    for(let i = 0; i < len; i++){
      arr.push(GetDate.getIndex(arrs[i], targets[i]))
    }
    return arr;
  },
  error(str){
	  console.error(str);
  }
}

module.exports = GetDate; 