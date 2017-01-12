const Nomad = require('nomad-stream')
const moment = require('moment')
const firebase = require('firebase');
const fireConfig = require('./firebase.js');

const nomad = new Nomad()
firebase.initializeApp(fireConfig);
let database = firebase.database();


// subscription node ids
const subscriptions = ['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6', 'QmULmQvxP7RYMHjQDcze6G5FoV4EaFKN5gC7Di7TrmUqKY','QmTzKsdeNiTmpeHBhq9uA8QYYPBvRTJjdPU6usrbP3SFso']

let instance, lastPub, notificationBody

const frequency = 60 * 1000 // 30 minutes 
const timeThreshold = 4 * 60 * 60 * 1000 // 4 hours

const defaultPublishData = { 
  [subscriptions[0]]: {
    time: '',
    description: 'Info about the Cambridge Core Team room' ,
    apple: {}
  },
  [subscriptions[1]]: {
    time: '',
    description: 'Weather in Cambridge, Ma' ,
    data: {},
  },
  [subscriptions[2]]: {
    time: '',
    description: 'Info about the Cambridge HVAC System' ,
    data: {},
  }
}

// How we manager the data
class DataMaintainer {
  constructor(){
    this.data = defaultPublishData
  }
  setValue(id, value){
    switch(id){
      case subscriptions[0]:{
        this.data[id]["time"] = value.time
        this.data[id]["data"] = value
        break;
      }
      case subscriptions[1]:{
        this.data[id]["time"] = value.time
        this.data[id]["data"] = value.query.results
        break;
      }
      case subscriptions[2]:{
        this.data[id]["time"] = value.time
        this.data[id]["data"] = value
        break;
      }
      default:{
        throw "unrecognized id"
      }
    }
  }
  cleanKey(key){
    let cleanedKey = key.replace(/\s+/, '\x01').split('\x01')[0]
    cleanedKey = cleanedKey.toLowerCase()
    return cleanedKey
  }
  getAll(){
    return this.data
  }
  isAllFilled(){
    return this.data[subscriptions[0]]['apple'] && this.data[subscriptions[0]]['time'] && this.data[subscriptions[1]]['apple']
  }
  clear(){
    this.data = defaultPublishData
  }
  toString(){
    return JSON.stringify(this.data)
  }
}

function getTime() {
  return new moment()
}

//init data manager
let dataManager = new DataMaintainer()

nomad.prepareToPublish()
  .then((n) => {
    instance = n
    return instance.publishRoot('Starting up Parker History Composite')
  })
  .then(() => {
    lastPub = getTime()
    nomad.subscribe(subscriptions, function(message) {
      console.log("==========================> Receieved a message for node " + message.id)
      console.log("==========================> Message was " + message.message)
      let messageData = JSON.parse(message.message)

      try{
        dataManager.setValue(message.id, messageData)
      }
      catch(err){
        console.log("DataMaintainer failed with error of " + err)
      }
      console.log(dataManager.toString())
      let currentTime = getTime()
      let timeSince = currentTime - lastPub
      if (timeSince >= frequency){
        console.log('===================================> timeSince >= timeBetween')
        if (dataManager.isAllFilled()) {
          console.log(dataManager.toString())
          instance.publish(dataManager.toString())
            .catch(err => console.log(`Error in publishing timeSince>=timeBetween negative state: ${JSON.stringify(err)}`))
        }
        lastPub = currentTime
      }
      if (timeSince >= timeThreshold){
        // let them know the node is still online
        console.log("===================================>   timeSince >= timeThreshold")
        console.log("***************************************************************************************")
        console.log('Heartbeat, I am alive but have not got data in a long time')
        console.log("***************************************************************************************")
        instance.publish('Heartbeat, I am alive but have not got data in a long time')
          .catch(err => console.log(`Error in publishing timeSince>=timeBetween: ${JSON.stringify(err)}`))
        dataManager.clear()
        lastPub = currentTime
      }
    })
  })
  .catch(err => console.log(`Error in main loop: ${JSON.stringify(err)}`))