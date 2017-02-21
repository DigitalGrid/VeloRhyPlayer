//libraries
import Tone from 'tone';
//constants
import { TONES, RHYTHMS, ARPEGGIO_SCALES, ARPEGGIO_STYLES } from './constants';

/*
* ==============================
* Class VeloRhySlider
* ==============================
*/

export default class VeloRhySlider {

  /*
  * constructor of the class VeloRhySlider
  * @param synth - synth to use
  */
  constructor(synth) {
    this.part = {} // Velocity/Rhythm/Arpeggio part
    this.synth = synth ? synth : new Tone.FMSynth().toMaster();
    this.velocityRange = 0
    this.currentRhythmPattern = RHYTHMS[0].pattern
    this.currentArpeggioPattern = {"scale": ARPEGGIO_SCALES[0].pattern, "style": ARPEGGIO_STYLES[0].pattern}
    this.octave = 2 //C3, C4, C5
    this.currentChord = "C" //parrent state?
    this.noteLength = "22n"

    this.updateSynth()
    this.updateVelocity(0)
  }

  /*
  * reorderNotes (helper method) - make currentChord note the first note in the array
  * @param notes - Array - octave of notes
  * @return notes - Array - reordered array of notes
  */
  reorderNotes(notes) {
    let detailedNotes = []
    let notesPart = notes.splice(0, notes.indexOf(this.currentChord))

    notes.forEach((element) => {
      detailedNotes.push({"note": element, "octave": this.octave})
    })

    notesPart.forEach((element) => {
      detailedNotes.push({"note": element, "octave": this.octave+1})
    })

    return detailedNotes
  }

  /*
  * buildNotes (helper method) - build all notes that's going to play with detailed information
  * @return values - Array - all notes that's going to play, includes time, note and velocity
  */
  buildNotes() {
    let values = []
    let rhyLength = this.currentRhythmPattern.length
    let notes = TONES.slice() //copy array
    notes = this.reorderNotes(notes)

    for(let i=0; i<rhyLength; i++) {
      let currentRP = this.currentRhythmPattern[i]
      let currentAP = this.currentArpeggioPattern.scale[this.currentArpeggioPattern.style[i]]
      let currentNote
      //console.log(this.currentArpeggioPattern.style)

      if (currentAP > 35) {
        currentNote = notes[currentAP-36].note + (notes[currentAP-36].octave+3)
      } else if (currentAP > 23) {
        currentNote = notes[currentAP-24].note + (notes[currentAP-24].octave+2)
      } else if (currentAP > 11) {
        currentNote = notes[currentAP-12].note + (notes[currentAP-12].octave+1)
      } else {
        currentNote = notes[currentAP].note + notes[currentAP].octave
      }

      values[i] = {"time": currentRP, "note": currentNote, "velocity": 1}
    }
    return values
  }

  /*
  * updateAllNotes (helper method) - update all notes
  */
  updateAllNotes() {
    let values = []
    //build all notes
    values = this.buildNotes()
    //update all notes
    let events = this.part._events
    events.forEach((element, i) => {
      element.value.note = values[i].note
    })
  }

  /*
  * updateVelocity - set velocity of all the notes
  * @param velocity - Number between 0-1
  * @return false if velocity is out of range
  */
  updateVelocity(velocity) {
    if(velocity < 0 || velocity > 1) {
      return false
    }
    let events = this.part._events
    events.forEach((element) => {
      element.value.velocity = velocity
    })
  }

  /*
  * updateArpScale
  * @param scale - Array - scale to play
  */
  updateArpScale(scale) {
    this.currentArpeggioPattern.scale = scale ? scale : this.currentArpeggioPattern.scale
    this.updateAllNotes()
  }

  /*
  * updateArpStyle
  * @param style - Array - style of pattern
  */
  updateArpStyle(style) {
    this.currentArpeggioPattern.style = style ? style : this.currentArpeggioPattern.style
    this.updateAllNotes()
  }

  /*
  * updateArpeggios - update the current arpeggio scale or/and style
  * @param scale - Array - scale to play
  * @param style - Array - style of pattern
  */
  updateArpeggios(scale, style) {
    //update arpeggio
    this.currentArpeggioPattern.scale = scale ? scale : this.currentArpeggioPattern.scale
    this.currentArpeggioPattern.style = style ? style : this.currentArpeggioPattern.style
    //build and update all notes
    this.updateAllNotes()
  }

  /*
  * updateRhythm - update the current rhythm
  * @param rhythm - Array
  */
  updateRhythm(rhythm) {
    let values = []
    let events = this.part._events

    //update rhythm
    this.currentRhythmPattern = rhythm ? rhythm : this.currentRhythmPattern
    //build all notes
    values = this.buildNotes()
    //update all notes
    this.part.removeAll()
    for(var i=0; i<values.length; i++) {
      this.part.add(values[i].time, values[i])
    }
  }

  /*
  * updateOctaveTo - update the current octave
  * @param octave - Number - set the octave
  */
  updateOctaveTo(octave) {
    //update octave
    this.octave = octave ? octave : this.octave
    //build and update all notes
    this.updateAllNotes()
  }

  /*
  * updateOctave - update the current octave, increase or decrease by the given number
  * @param octave - Number - increase or decrease by the given number
  */
  updateOctave(octave) {
    //update octave
    this.octave = octave ? (this.octave+octave) : this.octave
    //build and update all notes
    this.updateAllNotes()
  }

  /*
  * updateChord - update the current chord
  * @param - String - Set the chord
  */
  updateChord(chord) {
    //update chord
    this.currentChord = chord ? chord : this.currentChord
    //build and update all notes
    this.updateAllNotes()
  }

  /*
  * updateSynth
  * @param synth - Object - the new synth
  * @param noteLength - String - length of all notes
  * @param velocity - Number - velocity of all notes
  */
  updateSynth(synth, velocity) {
    this.synth = synth ? synth : this.synth

    let values = this.buildNotes()
    this.part = new Tone.Part((time, value) => {
      this.synth.triggerAttackRelease(value.note, this.noteLength, time, value.velocity)
    }, values)

    this.part.loop = true
  }


}
