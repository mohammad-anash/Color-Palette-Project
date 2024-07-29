const p1 = new Promise((res, rej) => {
  setTimeout(() => res("succes"), 2000);
});
const p2 = new Promise((res, rej) => {
  setTimeout(() => rej("erroe"), 1000);
});

const promises = [p1, p2];
Promise.allSettled(promises).then((result) => {
  const [getssome, getError] = result;
  console.log(getssome, getError);
});
