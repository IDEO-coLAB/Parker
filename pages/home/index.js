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

class HomeImage extends Component {
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
              <h1>{(this.props.goalTemp)? this.props.goalTemp : "75"}°</h1>
            </div>
          </div>

          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_doors.png"} />
            <div className={s.babyCard + ' ' + s.doorsFloorCard + ' ' + s.closedCard}>
              <h3>closed</h3>
              <h1>Yes</h1>
            </div>
            <div className={s.babyCard + ' ' + s.doorsFloorCard + ' ' + s.openedCard}>
              <h3>closed</h3>
              <h1>No</h1>
            </div>
          </div>

          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_living.png"} />
            <div className={s.babyCard + ' ' + s.livingFloorCard + ' ' + s.retainCard}>
              <h3>hvac status</h3>
              <h1>{this.props.hvacStatus}</h1>
            </div>
            <div className={s.babyCard + ' ' + s.livingFloorCard + ' ' + s.heatCard}>
              <h3>mins to heat</h3>
              <h1>12</h1>
            </div>
          </div>
        </div>

        <div className={s.grass}>
          <h1>Your house has an R-value of 23</h1>
          <h2>Now that you know whats actually happening in your house, here are a few personalized tips.</h2>
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
              You can prevent that by installing insulation in the walls.
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
              <p>We noticed that your top floor bedroom is typically warmer than anywhere else in the house. We noticed during the day it was very bright in that room, but the lights were off, which could mean your blinds/shades are open. It’s been sunny the past couple days, and that sunlight is probably heating up your room, so if you’d like to cooler, just try closing the blinds.
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
    this.state = {
      state: {
        // weather
        atmosphere: '',
        astronomy: '',
        conditions: '',
        // room
        insideTemp: '',
        // hvac
        hvacStatus: '',
      }
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
      const parsed = JSON.parse(json)
      // console.log('parsed:', json)

      const state = {
        // weather
        atmosphere: parsed['QmWPffJ8EYNBtQ7QNMF6GQ6VqoKARowZtiNNqxv8FZoXZq']['data']['channel']['atmosphere'],
        astronomy: parsed['QmWPffJ8EYNBtQ7QNMF6GQ6VqoKARowZtiNNqxv8FZoXZq']['data']['channel']['astronomy'],
        conditions: parsed['QmWPffJ8EYNBtQ7QNMF6GQ6VqoKARowZtiNNqxv8FZoXZq']['data']['channel']['item']['condition'],

        // room
        insideTemp: parsed['QmcXyKkn6yVeWuTzBGmxc1PY7UVLkXVWhjWeHL9KneYo5e']['data']['roomtemperature'],  // 68
        // insideTemp: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkertemperature'],
        // insidePressure: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkerpressure'],
        // goalTemp: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkergoaltemp'],
        // insideAltitude: parsed['QmREQVyyNum1RVRW9b4kKYHGsmmRovTsWTaTuBej9JBWx6']['data']['parkeraltitude'],

        // hvac
        hvacStatus: parsed['QmYPex7vTAx3mjkRME39CvVFaxt28aJAfp4rXySMCUiMje']['data']['heater'], // 'On' | 'Off'
        // hvacStatus: parsed['QmTzKsdeNiTmpeHBhq9uA8QYYPBvRTJjdPU6usrbP3SFso']['data']['parkerheaterfan'],
        // hvacForce: parsed['QmTzKsdeNiTmpeHBhq9uA8QYYPBvRTJjdPU6usrbP3SFso']['data']['fan']
      }

      console.log('incoming state: ', state)

      _this.setState({state})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    // weather
    const humidity = (this.state.state.atmosphere.humidity)
    const pressure = (this.state.state.atmosphere.pressure)
    const visibility = (this.state.state.atmosphere.visibility)
    const sunrise = (this.state.state.astronomy.sunrise)
    const sunset = (this.state.state.astronomy.sunset)
    const weatherTemp = (this.state.state.conditions.temp)
    const weatherText = (this.state.state.conditions.text)
    // room
    const insideTemp = (this.state.state.insideTemp.data)
    // hvac
    const hvacStatus = (this.state.state.hvacStatus.data)

    if (hvacStatus == undefined){
      lastHeaterStatus = false
    }

    return (
      <div>
        <HomeImage
          humidity={humidity}
          pressure={pressure}
          visibility={visibility}
          sunrise={sunrise}
          sunset={sunset}
          weatherTemp={weatherTemp}
          weatherText={weatherText}
          insideTemp={insideTemp}
          hvacStatus={hvacStatus}
          left="100"
          top="100" />
      </div>
    )
  }
}



export default HomePage
