const imgList = ["ido", "inf", "kwm", "pev", "uxq", "yaj", "zrc"];
const imgListToCat = {
  ido: "animals",
  inf: "flags",
  kwm: "architecture",
  pev: "birds",
  uxq: "food",
  yaj: "cars",
  zrc: "flowers",
};

const DATA = {
  ido: [
    "ldo1EhDfGteKi.png",
    "ldo5ZW2uFcs8C.png",
    "ldo6mc1rU9bfv.png",
    "ldo7BVlxjBNRE.png",
    "ldoCYuVHFtWLb.png",
    "ldoEeJ00854YT.png",
    "ldoH3DdtRNtVq.png",
    "ldoOX8nTokltc.png",
    "ldoSVKRQuZo3t.png",
    "ldoT6bv5b25ll.png",
    "ldobucUnbljBW.png",
    "ldodDJmvlxevO.png",
    "ldoj6VIzfaZtF.png",
    "ldojs2brXD7Tg.png",
    "ldok7aP8IN76Q.png",
    "ldonxIE0OblZB.png",
    "ldopVhndDJdPr.png",
    "ldophupbFTFaC.png",
    "ldosrYH6iCgIo.png",
    "ldozXcjJ65wPc.png",
  ],
  inf: [
    "inf57AAbLazWx.png",
    "inf81h1gEIcB3.png",
    "infBWG5Tr4yGQ.png",
    "infDT1UT1M76F.png",
    "infEjRoa0TgEl.png",
    "infG16JiGmwao.png",
    "infGxFxylBmZi.png",
    "infHNqkN0tZVQ.png",
    "infHpuBWJRkeA.png",
    "infKwWxYapO6Y.png",
    "infSVzR98YXPr.png",
    "infSwfa3G0h7Q.png",
    "infV0RNGOamhx.png",
    "infVayeC1qY5H.png",
    "infWCDmbiJPPa.png",
    "infWkqAaZXuBM.png",
    "infX30w6oMISa.png",
    "infZxG0AqddPp.png",
    "inffeHjRd1HwA.png",
    "infh1t9iBJ7ez.png",
    "infmjGGc0DQHN.png",
    "infuLHzQKaRvF.png",
    "infv8L1r2r388.png",
    "infwrV8bh0eP9.png",
    "infx28o14JMlU.png",
    "infyR0iGZ0Zm7.png",
    "infzK5uPMByQh.png",
    "infzQ0JhpEhDY.png",
  ],
  kwm: [
    "kwm65ggKjX2bH.png",
    "kwm86KGTrYjNf.png",
    "kwm8AStQQhESn.png",
    "kwmB13dyP6922.png",
    "kwmCf8CISDDue.png",
    "kwmEe1TolpmHD.png",
    "kwmIOaR0EBJE7.png",
    "kwmIRj2gFrOJz.png",
    "kwmQsBjZDvWTg.png",
    "kwmVSpvciWRKz.png",
    "kwmWn2AvGXE9s.png",
    "kwmbRHHjC46S7.png",
    "kwmmJ6lEevTkY.png",
    "kwmnDHofwbFm6.png",
    "kwmoCXK1AGqcU.png",
    "kwmrn4FvdVXrU.png",
    "kwmvnsAX46LV1.png",
    "kwmwfrI8LzpE2.png",
  ],
  uxq: [
    "uxq2Tfw6ESRXN.png",
    "uxq40s58vkvz5.png",
    "uxqBkCpiDeYEM.png",
    "uxqCsOqu78fNV.png",
    "uxqI3SVSPwIQU.png",
    "uxqTffVcdA3UN.png",
    "uxqU0DGDFRUYU.png",
    "uxqavvPuT7X35.png",
    "uxqgocXZKCOhK.png",
    "uxqho2yh0l5Ve.png",
    "uxqjMdMs9jn3F.png",
    "uxqjNAzEDD2Q8.png",
    "uxqjkcJkis51p.png",
    "uxqkXO2FzNz1f.png",
    "uxqntVuEmjg1t.png",
    "uxqoil2yveeXP.png",
    "uxqpJZFVghkKE.png",
    "uxqq6k9h5ORCJ.png",
    "uxqqSGsBmhtjr.png",
    "uxqt5LCVeoJJH.png",
    "uxqumK2CUbNa5.png",
  ],
  pev: [
    "pev2ypIcZZlMM.png",
    "pev49U8qyUilV.png",
    "pev5mQ4PutPQw.png",
    "pev5mnaJLB9XK.png",
    "pev7HidZxszwK.png",
    "pevAVVZbuyOJ1.png",
    "pevApwFK9F3e4.png",
    "pevGJrjwOq7xn.png",
    "pevIg0WqNw6OU.png",
    "pevJ5uOzsFmfu.png",
    "pevJrkJyXBGNb.png",
    "pevLLpXfKF1W0.png",
    "pevMFbfsFBBYA.png",
    "pevNWEVB9ZGXD.png",
    "pevRDoGx6S0eK.png",
    "pevTFpEy24GGc.png",
    "pevUKch63TeIk.png",
    "pevUYe9VIPXU1.png",
    "pevZi5Pn3P4Tc.png",
    "pevdVKf7qK7I3.png",
    "pevf0ykvbIy5x.png",
    "pevfSfPEKTVJV.png",
    "pevgpwwoJThqd.png",
    "pevgvwv9NB84e.png",
    "pevh1kMK69zYI.png",
    "pevlEFrr5VVMH.png",
    "pevnNbXztVFGK.png",
    "pevs1es0Fa6rF.png",
    "pevuMILmgvN7y.png",
    "pevvEh7RfZl37.png",
    "pevzjJEnEi3P7.png",
  ],
  yaj: [
    "yaj3tKeAg8e1i.png",
    "yaj4y7Zt63SQH.png",
    "yaj5MXF8kCbBS.png",
    "yaj9PcTYKndQO.png",
    "yajIgnyeLA32d.png",
    "yajXbAl0yPIZz.png",
    "yajbQ4bYCOPKZ.png",
    "yajdaWDwjALh3.png",
    "yajhIrgAXvRi7.png",
    "yajiQq5q7ji6V.png",
    "yajm9gvnBdhVh.png",
    "yajnD09DWndmV.png",
    "yajpc2mDma5S5.png",
    "yajq3vUZtj1EZ.png",
    "yajsaroc3nuHd.png",
    "yajseDDY8xDd2.png",
    "yajutKcI49F6S.png",
    "yajwXMUi5KdDn.png",
    "yajyzTfzmfIfB.png",
    "yajzdjkxwANsW.png",
  ],
  zrc: [
    "zrc2MZZY2vSn5.png",
    "zrc2WfBdG5ZdX.png",
    "zrc7K5sYzwuz1.png",
    "zrc7THC9c02Em.png",
    "zrc7UfsMkCSuv.png",
    "zrc7jwW0GI3SM.png",
    "zrc88aqq28GHu.png",
    "zrc8JCfJEQYtq.png",
    "zrc8hfc440d8s.png",
    "zrcAIDykWGVs2.png",
    "zrcAIFKKxdqzw.png",
    "zrcAdzluF6Kba.png",
    "zrcDoqbRn4RSM.png",
    "zrcMYq1rlOHng.png",
    "zrcP2UwRWdjyz.png",
    "zrcR9nJqURQwC.png",
    "zrcSDyUPKOAn3.png",
    "zrcSINmGBU8VW.png",
    "zrcStTypoOl5B.png",
    "zrcTEk2ncz0Ou.png",
    "zrcTaGsnpAN0Y.png",
    "zrcUKoAMFF2EE.png",
    "zrcWPKb6oYfr3.png",
    "zrcWQizpBTMb2.png",
    "zrcWfbtiGLJ55.png",
    "zrcYg0nkaQdQq.png",
    "zrcbB5bXcgP7v.png",
    "zrcc1Nrz2TW3A.png",
    "zrccGSKKKvctD.png",
    "zrcfp505goU1o.png",
    "zrcgnmjPH8gdw.png",
    "zrchKc5oT1xdW.png",
    "zrchg5PYx2M1R.png",
    "zrciF357bmgDC.png",
    "zrciVLbD4HPYB.png",
    "zrcksd2nCb074.png",
    "zrclP1MLzwYOr.png",
    "zrcmLjqA2kxj9.png",
    "zrcmhoyx1XRhs.png",
    "zrco5ExwRhwUN.png",
    "zrcoRHoRVHe85.png",
    "zrcpqwIJlybW3.png",
    "zrcqQkR0CP9gk.png",
    "zrcsypekNu389.png",
    "zrcwEm2wo3CR7.png",
    "zrcxXBZzMXNxv.png",
  ],
};

// app.get("/img", async (req, res) => {
//   var aaa = [];
//   var bb = [];
//   var p = "./public/inf/";
//   fs.readdir(p, function (err, files) {
//     var result = { data: "dwqdwd" };
//     if (err) {
//       console.error(err);
//     }
//     // res.setHeader("Content-Type", "text/html");

//     for (var i = 0; i < 3; i++) {
//       var pp = p + files[i];
//       console.log(pp);
//       console.log(files[i]);
//       bb.push(files[i]);
//       //   aaa.push(files[i]);
//       fs.readFile(pp, function (err, data) {
//         if (err) {
//           console.error(err);
//         }
//         bb.push(data);
//         var base64 = Buffer.from(data).toString("base64");
//         base64 = String(`data:image/png;base64,${base64}`);
//         // console.log(base64);
//         console.log(base64.length);
//         aaa.push(String(base64));
//         // console.log(result);
//         // res.send(base64);
//         console.log("in loppp");
//         res.write(JSON.stringify(base64));
//         res.write(`${i}`);
//         result["123"] = "sfasfasfaff";
//       });
//     }
//     console.log(aaa);
//     console.log(bb);
//     console.log(result);
//     res.json(aaa);
//   });
// });
// let lll = [];
// const imgData = {};

// async function myF() {
//   let names;
//   try {
//     names = await readdir(`./public/${imgList[0]}/`);
//   } catch (err) {
//     console.log(err);
//   }
//   if (names === undefined) {
//     console.log("undefined");
//   } else {
//     console.log("First Name", names[0]);
//     return names;
//   }
// }

// myF().then((val) => {
//   console.log(val);
// });
// async function getRandImg(lnt = 9) {
//   let result = [];
//   while (lnt > 1) {
//     k = imgList.length - 0.5;
//     ranFolder = Math.round(Math.random() * k);
//     // console.log(`ranFolder = ${ranFolder}`);

//     let files = await readdir(`./public/${imgList[ranFolder]}/`);
//     // console.log(`imgfolder = ${imgList[ranFolder]}`);
//     // console.log(`imgfolder legth = ${files.length}`);
//     ranfile = Math.round(Math.random() * lnt);
//     // console.log(`ranfile = ${ranfile}`);
//     for (let i = 0; i < ranfile; i++) {
//       ranNum = Math.round(Math.random() * files.length);
//       let p = `./public/${ranFolder}/${files[ranNum]}`;
//       result.push(p);
//       // console.log(`rannum = ${ranNum} p = ${files[ranNum]}`);
//       lnt--;
//     }
//   }
//   console.log(`lnt = ${lnt}`);
//   console.log("end");
//   // console.log(result);
//   return result;
// }

// getRandImg().then((val) => {
//   console.log(val.length);
//   console.log(val);
// });

function getImageGrid() {}

module.exports = getImageGrid;
