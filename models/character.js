import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema ({
  reviewer: String,
  avatar: String,
  content: String,
}, {
  timestamps: true,
});

const characterSchema = new Schema({
  name: String,
  race: {
    type: String,
    enum: ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-Elf', 'Halfling', 'Half-Orc', 'Human', 'Tiefling']
  },
  class: {
    type: String,
    enum: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rouge', 'Sorcerer', 'Warlock', 'Wizard']
  },
  level: {
    type: Number,
    min: 1,
    max: 20,
  },
  background: {
    type: String,
    enum: ['Acolyte', 'Criminal/Spy', 'Folk Hero', 'Noble', 'Sage', 'Soldier'
    ],
  },
  backstory: String,
  comments: [commentSchema],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
  }, { 
    timestamps: true,
})

const Character = mongoose.model('Character', characterSchema)

export {
  Character
}