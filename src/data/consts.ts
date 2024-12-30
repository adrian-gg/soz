export const TIMER_LENGTH = 30

export type TransitionsType = typeof TRANSITIONS

export const TRANSITIONS = {
  show: { duration: 1000 },
  hide: { duration: 500 },
  zoom_in: { duration: 1000 },
  zoom_out: { duration: 1000 },
  show_zoom: { duration: 1000 },
  hide_zoom: { duration: 500 },
}

export const TUTORIAL_SECTIONS = {
  parts: "Parts of the game",
  how: "How to play",
}

export const TUTORIAL = [
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.parts,
    body: `<p>Pawns: There are eight per player. Their value is from 1 to 8.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.parts,
    body: `<p>High tiles: The tiles farthest from the center of the board.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.parts,
    body: `<p>Low tiles: The tiles closest to the center of the board.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.parts,
    body: `<p>Segment: Combination of two High tiles and one Low tile.<br/>There are eight in total.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.how,
    body: `<p>In turns, each player must play one pawn, from 1 to 8, following the numerical order. They can play the pawn on High tile or Low tile.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.how,
    body: `<p>Once the board is full, in each of the eight Segments the value of the pawns of both players are added separately and subtracted from each other.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.how,
    body: `<p>The resulting total value of the winner of each Segment is added to the other Segments won by the same player.</p>`,
  },
  {
    img_alt: "",
    head: TUTORIAL_SECTIONS.how,
    body: `<p>The winner is the one with the highest value.</p><p>Note: the final result will be displayed in base9.</p>`,
  },
]
