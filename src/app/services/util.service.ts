import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  static makeId = (length = 16) => {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
  }

  static getRandomColor = () => {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  static getAllowedColor = () => {
    const colors = [
      '#ffffff', '#f28b82', '#fbbc04', '#fff475',
      '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
      '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

    return colors[Math.floor(Math.random() * 11)]
  }

  static makeLorem(size = 5) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
      size--
      txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
  }
}
