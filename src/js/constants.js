/*
* tones
*/
export const TONES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]

/*
* octaves
*/
export const OCTAVES = [1,2,3,4,5]

/*
* rhythms
*/
export const RHYTHMS = [
  {
    "name": "rhythm1",
    "pattern": ["0:0:0"],
  },
  {
    "name": "rhythm2",
    "pattern": ["0:0:0", "0:2:0"],
  },
  {
    "name": "rhythm3",
    "pattern": ["0:0:0", "0:1:0", "0:2:0", "0:3:0"],
  },
  {
    "name": "rhythm4",
    "pattern": ["0:0:0", "0:0:2", "0:0:4", "0:0:6", "0:0:8", "0:0:10", "0:0:12", "0:0:14"],
  },
  {
    "name": "rhythm5",
    "pattern": ["0:0:0", "0:0:1", "0:0:2", "0:0:3", "0:0:4", "0:0:5", "0:0:6", "0:0:7", "0:0:8", "0:0:9", "0:0:10", "0:0:11", "0:0:12", "0:0:13", "0:0:14", "0:0:15"],
  },
  {
    "name": "rhythm6",
    "pattern": ["0:0:0", "0:0:2", "0:0:4", "0:0:6", "0:0:8", "0:0:9", "0:0:11", "0:0:13", "0:0:14"],
  },
]

/*
* arpeggio scales
*/
export const ARPEGGIO_SCALES = [
  {
    "name": "major",
    "pattern": [0, 4, 7, 12, 16, 19, 24, 28, 31],
  },
  {
    "name": "minor",
    "pattern": [0, 3, 7, 12, 15, 19, 24, 27, 31],
  },
  {
    "name": "ionian",
    "pattern": [0, 2, 4, 5, 7, 9, 11, 12, 14],
  },
  {
    "name": "dorian",
    "pattern": [0, 2, 3, 5, 7, 9, 10, 12, 14],
  },
  {
    "name": "phrygian",
    "pattern": [0, 1, 3, 5, 7, 8, 10, 12, 13],
  },
]

/*
* arpeggio styles
*/
export const ARPEGGIO_STYLES = [
  {
    "name": "arpeggio1",
    "pattern": [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7],
  },
  {
    "name": "arpeggio2",
    "pattern": [7,6,5,4,3,2,1,0,7,6,5,4,3,2,1,0],
  },
  {
    "name": "arpeggio3",
    "pattern": [0,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1],
  },
  {
    "name": "arpeggio4",
    "pattern": [0,1,2,3,4,5,6,7,8,7,6,5,4,3,2,1],
  },
  {
    "name": "arpeggio5",
    "pattern": [0,1,0,1,1,1,1,0,0,1,0,1,1,2,1,0],
  },
]
