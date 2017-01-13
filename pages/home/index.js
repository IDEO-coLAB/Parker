import React, { Component } from 'react'
import R from 'ramda'
import moment from 'moment'
// import local css as s.
import s from './styles.css'
// import global css as gs
import gs from './../../styles/grid.css'

function randomIntBtwNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getTime() {
  return new moment()
}

let pressureUPCount = 0;
let pressureCounts = 0;
let lastHeaterStatus = false;
let timeStartHeat;
let timeStartOff;

class CarSpot extends Component {
  render() {
    const left = `${this.props.left}px`
    const top = `${this.props.top}px`
    const theClass = (this.props.isFree)? s.spotFree : s.spotTaken
    return (
      <div className={s.contentBody}>
        <div className={s.house}>
          <div className={s.attic}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_attic.png"} />
          </div>
          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_office.png"} />
            <div className={s.babyCard + ' ' + s.officeFloorCard + ' ' + s.interiorCard}>
              <h3>interior</h3>
              <h1>{(this.props.insideTemp)? Math.round(this.props.insideTemp) : "NA"}°</h1>
            </div>
            <div className={s.babyCard + ' ' + s.officeFloorCard + ' ' + s.exteriorCard}>
              <h3>exterior</h3>
              <h1>{(this.props.weatherTemp)? this.props.weatherTemp : "NA"}°</h1>
            </div>
            <div className={s.babyCard + ' ' + s.officeFloorCard + ' ' + s.setCard}>
              <h3>set temp</h3>
              <h1>{(this.props.goalTemp)? this.props.goalTemp : "NA"}°</h1>
            </div>
          </div>
          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_doors.png"} />
            <div className={s.babyCard + ' ' + s.doorsFloorCard + ' ' + s.closedCard}>
              <h3>closed</h3>
              <h1>{(this.props.pressureRatio)? this.props.pressureRatio : "NA"}%</h1>
            </div>
            <div className={s.babyCard + ' ' + s.doorsFloorCard + ' ' + s.openedCard}>
              <h3>opened</h3>
              <h1>{(this.props.pressureRatio)? (100-this.props.pressureRatio) : "NA"}%</h1>
            </div>
          </div>
          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_living.png"} />
            <div className={s.babyCard + ' ' + s.livingFloorCard + ' ' + s.retainCard}>
              <h3>time retained</h3>
              <h1>{(this.props.timeHeating)? (this.props.timeHeating/60000) : "NA"}</h1>
            </div>
            <div className={s.babyCard + ' ' + s.livingFloorCard + ' ' + s.heatCard}>
              <h3>time to heat</h3>
              <h1>{(this.props.timeHeating)? (this.props.timeHeating/60000)  : "NA"}</h1>
            </div>
          </div>
        </div>
        <div className={s.grass}>
          <h1>Cool info! Your house has a P value of {this.props.pValue? this.props.pValue.toFixed(2) : "NA"}</h1>
          <h2>Now that you know whats actually happening in your house, heres a couple tips and tricks personalized for you!</h2>
          <div className={s.suggestioncard}>
            <div className={s.imageContainer}>
            {/*}<img className={s.cardImage} src={"../../assets/images/insulation.png"} /> */}
            </div>
            <div className={s.textContainer}>
              <h1>Replace Insulation</h1>
              <h2>Your Energy Benefit: <span className={s.urgent}>Highly Recommended</span></h2>
              <h2>Estimated Return: <span className={s.price}>$2000 annually</span></h2>
              <h2>Cost: <span className={s.cost}>$400-$1700</span></h2>
              <p>We noticed your heater is working extra hard, especially compared to other homes similar to yours.
              We also noticed that it’s been really cold outside, so we think you might have heat escaping your home through the walls.
              You can prevent that by installing insulation in the walls. Imagine the stuffing inside of your thickest, warmest jacket….
              But in your walls! Mind. Blown.
              </p>
            </div>
          </div>
          <div className={s.suggestioncard}>
            <div className={s.imageContainer}>
            {/* <img className={s.cardImage} src={"../../assets/images/insulation.png"} /> */}
            </div>
            <div className={s.textContainer}>
              <h1>Close Your Blinds</h1>
              <h2>Your Energy Benefit: <span className={s.medium}>Recommended</span></h2>
              <h2>Estimated Return: <span className={s.price}>$120 annually</span></h2>
              <h2>Cost: <span className={s.cost}>$400-$1700</span></h2>
              <p>We noticed that your top floor bedroom is typically warmer than anywhere else in the house. We noticed during the day it was very bright in that room, but the lights were off, which could mean your blinds/shades are open. It’s been sunny the past couple days, and that sunlight is probably heating up your room, so if you’d like to cooler, just try closing the blinds!
              </p>
            </div>
          </div>
          <div className={s.suggestioncard}>
            <div className={s.imageContainer}>
            {/* <img className={s.cardImage} src={"../../assets/images/insulation.png"} /> */}
            </div>
            <div className={s.textContainer}>
              <h1>Replace Windows</h1>
              <h2>Your Energy Benefit: <span className={s.low}>Currently Low</span></h2>
              <h2>Estimated Return: <span className={s.price}>$400 annually</span></h2>
              <h2>Cost: <span className={s.cost}>$500-$1500</span></h2>
              <p>We noticed that your office has been colder than the rest of your home the past couple of days. It’s also been windy outside, and we think there might be a draft in your office. This could mean that your window is not closed. If it is closed, you may want to check that it is installed correctly and doesn’t have any cracks or gaps.
              </p>
            </div>
          </div>
          <div className={s.suggestioncard}>
            <div className={s.imageContainer}>
            {/* <img className={s.cardImage} src={"../../assets/images/insulation.png"} /> */}
            </div>
            <div className={s.textContainer}>
              <h1>Be Cautious of Open Doors</h1>
              <h2>Your Energy Benefit: <span className={s.urgent}>Highly Recommended</span></h2>
              <h2>Estimated Return: <span className={s.price}>$40 annually</span></h2>
              <h2>Cost: <span className={s.cost}>Free</span></h2>
              <p>We noticed that your heater is working extra hard, especially compared to other homes similar to yours. We also noticed that it’s been really cold outside, and we’ve been detecting a draft in your living room, though your door is closed. You might want to check that your doggy-door is well-sealed.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {state:
      { windSpeed: '', atmosphere: '', astronomy: '', conditions: '', insideTemp: '', insidePressure: '', goalTemp: '', insideAltitude: '', hvacStatus: '', hvacForce: '',}
    }
  }

  componentDidMount() {
    const _this = this
    setInterval(() => {
      _this.updateState()
    }, 5000)
  }

  updateState() {
    let _this = this
    fetch('http://localhost:9000')
    .then(res => res.json())
    .then(json => {
      // const state = [
      //   {available: true, price: 1},
      //   {available: false, price: 2},
      // ]
      console.log(json)
      const parsed = JSON.parse(json)
      debugger
      const state = {
        windSpeed: parsed['QmULmQvxP7RYMHjQDcze6G5FoV4EaFKN5gC7Di7TrmUqKY']['data']['channel']['wind']['speed'],
        atmosphere: parsed['QmULmQvxP7RYMHjQDcze6G5FoV4EaFKN5gC7Di7TrmUqKY']['data']['channel']['atmosphere'],
        astronomy: parsed['QmULmQvxP7RYMHjQDcze6G5FoV4EaFKN5gC7Di7TrmUqKY']['data']['channel']['astronomy'],
        conditions: parsed['QmULmQvxP7RYMHjQDcze6G5FoV4EaFKN5gC7Di7TrmUqKY']['data']['channel']['item']['condition'],
        insideTemp: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkertemperature'],
        insidePressure: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkerpressure'],
        goalTemp: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkergoaltemp'],
        insideAltitude: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkeraltitude'],
        hvacStatus: parsed['QmTzKsdeNiTmpeHBhq9uA8QYYPBvRTJjdPU6usrbP3SFso']['data']['parkerheaterfan'],
        hvacForce: parsed['QmTzKsdeNiTmpeHBhq9uA8QYYPBvRTJjdPU6usrbP3SFso']['data']['fan']
      }

      _this.setState({state})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {  
    const humidity = (this.state.state.atmosphere.humidity)
    const pressure = (this.state.state.atmosphere.pressure)
    const visibility = (this.state.state.atmosphere.visibility)
    const sunrise = (this.state.state.astronomy.sunrise)
    const sunset = (this.state.state.astronomy.sunset)
    const weatherTemp = (this.state.state.conditions.temp)
    const weatherText = (this.state.state.conditions.text)
    const insideTemp = (this.state.state.insideTemp.data)
    const insidePressure = (this.state.state.insidePressure.data)
    const goalTemp = (this.state.state.goalTemp.data)
    const insideAltitude = (this.state.state.insideAltitude.data)
    const hvacStatus = (this.state.state.hvacStatus.data)
    const hvacForce = (this.state.state.hvacForce.data)
    if(insidePressure > 101500){
      pressureCounts++
      pressureUPCount++
    } else if (insidePressure <= 101500){
      pressureCounts++
    } 
    let pressureRatio
    if(pressureCounts != 0){
      pressureRatio = Math.round((pressureUPCount/pressureCounts)*100)
    } else {
      pressureRatio = ''
    }

    let timeHeating,timeRetained
    if(hvacStatus == "On" && lastHeaterStatus == false){
      timeStartHeat = (this.state.state.hvacStatus.time)
    } else if(hvacStatus == "On" && lastHeaterStatus == true){
      timeHeating = (getTime()-timeStartHeat)
    } else if (hvacStatus == "False" && lastHeaterStatus == true){
      timeStartOff = (this.state.state.hvacStatus.time)
    } else if (hvacStatus == "False" && lastHeaterStatus == false){
      if(hvacStatus == undefined){
        timeStartOff = getTime()
        timeRetained = 0
      }
      timeRetained = (getTime()-timeStartOff)
    }
    // const price0 = (this.state.state.price)? `$${this.state.state.price}` : ''
    // const price1 = (this.state.state[1].price)? `$${this.state.state[1].price}` : ''
    // const chargeTime0 = (this.state.state.timeCharging)? `Been charging for ${this.state.state.timeCharging.substring(0,6)} minutes` : ''
    // const chargeTime1 = (this.state.state[1].timeCharging)? `Been charging for ${this.state.state[1].timeCharging.substring(0,6)} minutes` : ''
    // const doing = (this.state.state.changeinPercent.includes('-')) ? 'poorly' : 'well'
    // const stockchange = (this.state.state.changeinPercent.includes('+')) ? 'increased' : 'decreased'
    if (hvacStatus == undefined){
      lastHeaterStatus = false
    } else {
      lastHeaterStatus = hvacStatus.includes('On') ? true : false
    }

    const pValue = (20 + (insideTemp-weatherTemp)) * (insideTemp/goalTemp)
    return (
      <div>
        <CarSpot pressureRatio={pressureRatio} humidity={humidity} pressure={pressure} visibility={visibility} sunrise={sunrise} sunset={sunset} weatherTemp={weatherTemp} weatherText={weatherText} insideTemp={insideTemp} insidePressure={insidePressure} goalTemp={goalTemp} insideAltitude={insideAltitude} hvacStatus={hvacStatus} hvacForce={hvacForce} windSpeed={this.state.state.windSpeed} timeHeating={timeHeating} timeRetained={timeRetained} pValue={pValue}left="100" top="100"/>
      </div>
    )
  }
}



export default HomePage
