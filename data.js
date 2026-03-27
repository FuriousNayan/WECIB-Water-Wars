// ================================================================
//  WECIB WATER WARS — TOURNAMENT DATA
// ================================================================
//  To update the website:
//    1. Edit values below (scores, kills, eliminated, winner, etc.)
//    2. git add . && git commit -m "Update results" && git push
//    3. Site updates automatically on GitHub Pages
// ================================================================

const TOURNAMENT = {
  name: "WECIB Water Wars",
  currentWeek: 1,
  status: "Round 1",
};

const ANNOUNCEMENTS = [
  "Welcome to Water Wars! Round 1 matchups are live!",
];

const PURGE_DAY = {
  active: true,
  rules: [
    "Safety items are BANNED — no protection allowed.",
    "Location sharing may be turned OFF from 3:00 PM – 6:00 PM.",
    "All other standard rules still apply.",
  ],
};

// ----------------------------------------------------------------
//  TEAMS
//  - To mark a player eliminated in the current match, set eliminated: true
//  - To add kills, increment the kills number
// ----------------------------------------------------------------
const TEAMS = [
  {
    id: "la-leakers",
    name: "Los Angeles LEAKrs",
    benched: "Abid", // e.g. "Lucas, Abid"
    players: [
      { name: "Lucas", eliminated: false, kills: 2 },
      { name: "Karim", eliminated: false, kills: 0 },
      { name: "Evan Y", eliminated: false, kills: 1 },
      { name: "Abid", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "the-crackin",
    name: "The Kraken",
    benched: "",
    players: [
      { name: "Khani", eliminated: true, kills: 0 },
      { name: "Jessica", eliminated: true, kills: 0 },
      { name: "Alex", eliminated: true, kills: 0 },
    ],
  },
  {
    id: "splash-team-6",
    name: "Splash Team 6",
    benched: "Adam",
    players: [
      { name: "Adam", eliminated: false, kills: 0 },
      { name: "Keshav", eliminated: false, kills: 0 },
      { name: "Evan G", eliminated: false, kills: 1 },
      { name: "Caleb", eliminated: false, kills: 1 },
    ],
  },
  {
    id: "aquabats",
    name: "Aquabats",
    benched: "Rudra",
    players: [
      { name: "Afton", eliminated: false, kills: 0 },
      { name: "Quint", eliminated: true, kills: 0 },
      { name: "Andrew", eliminated: true, kills: 0 },
      { name: "Rudra", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "splash-bros",
    name: "SplashBros",
    benched: "Trevor",
    players: [
      { name: "Beckett", eliminated: false, kills: 0 },
      { name: "Bennett", eliminated: true, kills: 1 },
      { name: "Nick", eliminated: true, kills: 0 },
      { name: "Trevor", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "powersplash-girls",
    name: "The PowerSplash Girls",
    benched: "Sara",
    players: [
      { name: "Brandon", eliminated: true, kills: 0 },
      { name: "Claire", eliminated: false, kills: 0 },
      { name: "Sophia", eliminated: false, kills: 2 },
      { name: "Sara", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "certified-soaker",
    name: "Certified Soaker Boys",
    benched: "",
    players: [
      { name: "Arham", eliminated: false, kills: 0 },
      { name: "Marcus", eliminated: true, kills: 0 },
      { name: "Melo", eliminated: false, kills: 1 },
      { name: "Victor", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "baja-blasters",
    name: "Baja Blasters",
    benched: "",
    players: [
      { name: "Gauhar", eliminated: false, kills: 1 },
      { name: "Olivia", eliminated: false, kills: 0 },
      { name: "Evelyn", eliminated: false, kills: 0 },
      { name: "Mandi", eliminated: true, kills: 0 },
    ],
  },
  {
    id: "squirtle-squad",
    name: "SquirtleSquad",
    benched: "Dennis",
    players: [
      { name: "Parth", eliminated: false, kills: 0 },
      { name: "Dennis", eliminated: false, kills: 0 },
      { name: "Surya", eliminated: false, kills: 0 },
      { name: "Emerick", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "squirtshank",
    name: "Squirtshank Redemption",
    benched: "",
    players: [
      { name: "Nayan", eliminated: false, kills: 0 },
      { name: "Gabe", eliminated: false, kills: 0 },
      { name: "Jack", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "drip-or-drown",
    name: "Drip or Drown",
    benched: "",
    players: [
      { name: "Sham", eliminated: false, kills: 0 },
      { name: "Maryam", eliminated: false, kills: 0 },
      { name: "Farah", eliminated: false, kills: 0 },
    ],
  },
  {
    id: "bikini-bottom",
    name: "Bikini Bottom Soakers",
    benched: "",
    players: [
      { name: "Mays", eliminated: false, kills: 0 },
      { name: "Tanu", eliminated: false, kills: 0 },
      { name: "Sravya", eliminated: false, kills: 0 },
    ],
  },
];

// ----------------------------------------------------------------
//  MATCHES
//  - team1 / team2: use team IDs from above, or null if TBD
//  - winner: set to the winning team's ID when the match finishes
//  - status: "upcoming" | "in-progress" | "completed"
//  - team1Score / team2Score: total points (kills + surviving players)
// ----------------------------------------------------------------
const MATCHES = [
  // ===== WINNERS BRACKET — ROUND 1 =====
  { id: 1,  bracket: "winners", round: 1, team1: "la-leakers",       team2: "the-crackin",        team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M1" },
  { id: 2,  bracket: "winners", round: 1, team1: "splash-team-6",    team2: "aquabats",           team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M2" },
  { id: 3,  bracket: "winners", round: 1, team1: "splash-bros",      team2: "powersplash-girls",  team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M3" },
  { id: 4,  bracket: "winners", round: 1, team1: "certified-soaker", team2: "baja-blasters",      team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M4" },
  { id: 5,  bracket: "winners", round: 1, team1: "squirtle-squad",   team2: "squirtshank",        team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M5" },
  { id: 6,  bracket: "winners", round: 1, team1: "drip-or-drown",    team2: "bikini-bottom",      team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M6" },

  // ===== WINNERS BRACKET — ROUND 2 =====
  { id: 7,  bracket: "winners", round: 2, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M7",  team1Placeholder: "Winner of M1", team2Placeholder: "Winner of M2" },
  { id: 8,  bracket: "winners", round: 2, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M8",  team1Placeholder: "Winner of M3", team2Placeholder: "Winner of M4" },
  { id: 9,  bracket: "winners", round: 2, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "M9",  team1Placeholder: "Winner of M5", team2Placeholder: "Winner of M6" },

  // ===== WINNERS BRACKET — SEMIFINALS =====
  { id: 10, bracket: "winners", round: 3, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "SF1", team1Placeholder: "Winner of M7", team2Placeholder: "Losers Bracket Winner" },
  { id: 11, bracket: "winners", round: 3, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "SF2", team1Placeholder: "Winner of M8", team2Placeholder: "Winner of M9" },

  // ===== WINNERS BRACKET — FINALS =====
  { id: 12, bracket: "winners", round: 4, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "Final", team1Placeholder: "Winner of SF1", team2Placeholder: "Winner of SF2" },

  // ===== LOSERS BRACKET — ROUND 1 =====
  { id: 13, bracket: "losers", round: 1, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "LB1", team1Placeholder: "Loser of M1", team2Placeholder: "Loser of M2" },
  { id: 14, bracket: "losers", round: 1, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "LB2", team1Placeholder: "Loser of M3", team2Placeholder: "Loser of M4" },
  { id: 15, bracket: "losers", round: 1, team1: null, team2: null, team1Score: null, team2Score: null, winner: null, status: "upcoming", label: "LB3", team1Placeholder: "Loser of M5", team2Placeholder: "Loser of M6" },

];

// ----------------------------------------------------------------
//  BRACKET STRUCTURE (controls how the bracket is displayed)
//  Only edit if the bracket format itself changes.
// ----------------------------------------------------------------
const BRACKET_STRUCTURE = {
  winners: {
    title: "Winners Bracket",
    rounds: [
      { label: "Round 1",      matchIds: [1, 2, 3, 4, 5, 6] },
      { label: "Round 2",      matchIds: [7, 8, 9] },
      { label: "Semifinals",   matchIds: [], underConstruction: true },
      { label: "Finals",       matchIds: [], underConstruction: true },
    ],
    connections: [
      { from: [1, 2], to: 7 },
      { from: [3, 4], to: 8 },
      { from: [5, 6], to: 9 },
    ],
  },
  losers: {
    title: "Losers Bracket",
    rounds: [
      { label: "Round 2",      matchIds: [13, 14, 15] },
      { label: "Losers Final", matchIds: [], underConstruction: true },
    ],
    connections: [],
  },
};

// ----------------------------------------------------------------
//  REELS — Elimination Cams
//  Add videos here. They show up in the Reels section.
//
//  src:   path to the video file (put files in the videos/ folder)
//         OR a direct URL (e.g. from Google Drive, Dropbox, etc.)
//  title: short caption shown under the video
//  week:  which week it happened
//
//  Example:
//  { src: "videos/evan-gets-khani.mp4", title: "Evan eliminates Khani", week: 1 },
//  { src: "https://some-url.com/clip.mp4", title: "Big play!", week: 1 },
// ----------------------------------------------------------------
const REELS = [
   { src: "videos/evan elim jessica.MOV", title: "evan top 1 at wecib", week: 1 },
   { src: "videos/gauhar elim marcus.MOV", title: "both hands on the steering wheel pls", week: 1 },
   { src: "videos/evan elim andrew.MOV", title: "why unc in that pose tho", week: 1 },

];
