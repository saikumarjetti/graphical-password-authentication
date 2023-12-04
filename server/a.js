const { points_table } = require("./array");
//pass the array as parameter

/**
 * Return Array of Participants_Name
 */

const Participants_Name = (points_table) => {
  let ans = [];
  let a = JSON.parse(JSON.stringify(points_table));
  for (let i in a) {
    ans.push(a[i].name);
  }
  return [...ans];
};
//  console.log( Participants_Name(points_table));
//  console.log( ['Alex', 'Ellen', 'Duke', 'Brayo', 'Zyen', 'Raine'] )

/**
 add Round4 Scores
 Alex - 4, Ellen - 2, Duke - 7, Brayo - 8, Zyen - 5, Raine - 10 
 return the data After appending the Round4 Score
 */

const Round4_Points = (points_table) => {
  let a = JSON.parse(JSON.stringify(points_table));
  let ans = { Alex: 4, Ellen: 2, Duke: 7, Brayo: 8, Zyen: 5, Raine: 10 };
  for (let i in a) {
    a[i]["Round4"] = parseInt(ans[a[i].name]);
  }
  return [...a];
};
// console.log( Round4_Points(points_table));

/**
 * Return Points Table with a Total property which has sum of Round1, Round2, Round3 and Round4
 */
const Total = (points_table) => {
  // points_table = [...Round4_Points(points_table)];
  let a = JSON.parse(JSON.stringify(Round4_Points(points_table)));
  for (let i in a) {
    let ans = 0;
    for (let j in a[i]) {
      if (j !== "name") {
        ans += parseInt(a[i][j]);
      }
    }
    a[i]["Total"] = parseInt(ans);
  }
  return [...a];
};
// console.log( Total(points_table));

//returns the Winners as statement eg: "Winner: a,b"
const Winner = (points_table) => {
  dd = JSON.parse(JSON.stringify(Total(points_table)));
  let a = "Winners: ";
  let ans = [];
  let winName = [];
  let max = 0;
  for (let i in dd) {
    let t = dd[i].Total;
    ans.push(t);
    max = Math.max(max, t);
  }

  for (let i in dd) {
    if (dd[i].Total === max) {
      winName.push(dd[i].name);
    }
  }
  a += winName.join();
  return a;
};
// console.log(
//   Winner([
//     {
//       name: "Alex",
//       Round1: 4,
//       Round2: 3,
//       Round3: 6,
//     },

//     {
//       name: "Ellen",
//       Round1: 8,
//       Round2: 9,
//       Round3: 2,
//     },

//     {
//       name: "Duke",
//       Round1: 5,
//       Round2: 5,
//       Round3: 6,
//     },

//     {
//       name: "Brayo",
//       Round1: 3,
//       Round2: 7,
//       Round3: 7,
//     },

//     {
//       name: "Zyen",
//       Round1: 4,
//       Round2: 7,
//       Round3: 6,
//     },
//     {
//       name: "Raine",
//       Round1: 5,
//       Round2: 8,
//       Round3: 2,
//     },
//   ])
// );
// console.log(Winner(Total(Round4_Points(points_table))));

//returns the top three score in the points table as statement
const TopThree = (points_table) => {
  // console.log(points_table)
  dd = JSON.parse(JSON.stringify(Total(Round4_Points(points_table))));
  // console.log(points_table)
  let ans = [];
  for (let i in dd) {
    let t = dd[i].Total;
    ans.push(t);
  }
  // console.log(ans)
  ans.sort();
  // console.log(ans)
  ans.reverse();
  ans = [...new Set(ans)];
  // ans
  return `The top three scores are ${ans[0]},${ans[1]} and ${ans[2]}`;
};

// console.log(TopThree(points_table))
// write code to find whether a person who was in the winning position till Round3 has won the game after Round4
const CompareRound2AndRound3 = (points_table) => {
  let a =
    "The person who was in the winning position till round 3 does not win the game after round 4";
  let dd = JSON.parse(JSON.stringify(points_table));
  let r3 = JSON.parse(JSON.stringify(dd));
  for (let i in r3) {
    let ans = 0;
    for (let j in r3[i]) {
      if (j !== "name") {
        ans += parseInt(r3[i][j]);
      }
    }
    r3[i]["Total"] = parseInt(ans);
  }
  let r4 = JSON.parse(JSON.stringify(Total(dd)));
  console.log(Winner(r3));
  console.log(Winner(r4));
  console.log(Winner(r3).localeCompare(Winner(r4)));
  if (Winner(r3).localeCompare(Winner(r4)) == 0) {
    console.log("yes");
  } else {
    return a;
  }
};
console.log(CompareRound2AndRound3(points_table));
module.exports = {
  Participants_Name,
  Round4_Points,
  Total,
  Winner,
  TopThree,
  CompareRound2AndRound3,
};
