/*
use debounce to limit how often a function can be invoked.
limit how ofter onInput will get called. the if statement gets skipped because it doesnt have timeoutId yet. The setTimeout() calls onInput 
and its arguments.(fetches data) then it gets a timeoutId and clearTimeout() runs 
*/
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
