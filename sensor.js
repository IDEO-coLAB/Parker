const Nomad = require('nomad-stream')
const nomad = new Nomad()
const fetch = require('node-fetch')

let instance = null  // the nomad instance
const pollFrequency =  60 * 1000 // 60 seconds
const url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='cambridge, massachusetts')&format=json&env=store://datatables.org/alltableswithkeys`

console.log(url)

function getMessage() {
  return fetch(url)
    .then(res => res.json())
    .then(json => JSON.stringify(json))
    .catch(err => {
      console.log('getMessage error: ', err)
      return err
    })
}

function startPoll(frequency) {
  setInterval(() => {
    getMessage()
      .then((m) => {
        console.log('publishing on nomad:', m)
        return instance.publish(m)
      })
      .catch((err) => console.log('Weather error: ', err))
  }, frequency)
}

nomad.prepareToPublish()
  .then((node) => {
    instance = node
    console.log('about to publish root')
    return instance.publishRoot('hello')
  })
  .then(() => {
    console.log('root published')
    startPoll(pollFrequency)
  })
  .catch(console.log)
