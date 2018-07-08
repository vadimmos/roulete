module.exports.default = function (min, max = 0){
  let result = Math.random();
  min = Number(min);
  max = Number(max);
  if ( isNaN(min) || isNaN(max)) return result;
  if(max<min){
      const temp = min;
      min = max;
      max = temp;
  }
  for(result = NaN; isNaN(result) || result < min || result > max; result = Math.floor(Math.random() * (max + 1))){};
  return result;
}
//изменил