const index = require("./index");
const assert = require("assert");

it("Participants_Name", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  a = ["Alex", "Ellen", "Duke", "Brayo", "Zyen", "Raine"];

  assert.deepEqual(index.Participants_Name(points_table), a);
});

it("Round4_Points", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  const a = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
      Round4: 4,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
      Round4: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
      Round4: 7,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
      Round4: 8,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
      Round4: 5,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
      Round4: 10,
    },
  ];

  assert.deepEqual(index.Round4_Points(points_table), a);
});

it("Total", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  const a = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
      Round4: 4,
      Total: 17,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
      Round4: 2,
      Total: 21,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
      Round4: 7,
      Total: 23,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
      Round4: 8,
      Total: 25,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
      Round4: 5,
      Total: 22,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
      Round4: 10,
      Total: 25,
    },
  ];

  assert.deepEqual(index.Total(points_table), a);
});

it("Winner", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  const a = "Winners: Brayo,Raine";
  assert.deepEqual(index.Winner(points_table), a);
});

it("Winner(optional)", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },
  ];
  const a = "Winners: Duke,Raine";
  assert.deepEqual(index.Winner(points_table), a);
});

it("Winner(optional1)", () => {
  const points_table = [
    {
      name: "Duke",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Alex",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Raine",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Zyen",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },
  ];
  const a = "Winners: Raine";
  assert.deepEqual(index.Winner(points_table), a);
});

it("TopThree", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  const a = "The top three scores are 25,23 and 22";
  assert.deepEqual(index.TopThree(points_table), a);
});

it("CompareRound2AndRound3", () => {
  const points_table = [
    {
      name: "Alex",
      Round1: 4,
      Round2: 3,
      Round3: 6,
    },

    {
      name: "Ellen",
      Round1: 8,
      Round2: 9,
      Round3: 2,
    },

    {
      name: "Duke",
      Round1: 5,
      Round2: 5,
      Round3: 6,
    },

    {
      name: "Brayo",
      Round1: 3,
      Round2: 7,
      Round3: 7,
    },

    {
      name: "Zyen",
      Round1: 4,
      Round2: 7,
      Round3: 6,
    },
    {
      name: "Raine",
      Round1: 5,
      Round2: 8,
      Round3: 2,
    },
  ];
  const a =
    "The person who was in the winning position till round 3 does not win the game after round 4";
  assert.equal(index.CompareRound2AndRound3(points_table), a);
});
