import React, { Component } from 'react'
import R from 'ramda'

// import local css as s.
import s from './styles.css'
// import global css as gs
import gs from './../../styles/grid.css'

function randomIntBtwNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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
          </div>
          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_doors.png"} />
          </div>
          <div className={s.floor}>
            <img className={s.floorimage} src={"../../assets/images/HouseSiteMockup_living.png"} />
          </div>
        </div>
        <div className={s.grass}>
          <h1>Cool info!</h1>
          <h2>Now that you know whats actually happening in your house, heres a couple tips and trciks personalized for you!</h2>
          <div className={s.suggestioncard}>
            <div className={s.imageContainer}>
            <img className={s.cardImage} src={"../../assets/images/insulation.png"} />
            </div>
            <div className={s.textContainer}>
              <h1>Replace Insulation</h1>
              <h2>When: <span className={s.urgent}>Sometime in the next year</span></h2>
              <h2>How much: <span className={s.urgent}>$400-$1700</span></h2>
              <p>We noticed your heater is working extra hard, especially compared to other homes similar to yours.
              We also noticed that it’s been really cold outside, so we think you might have heat escaping your home through the walls.
              You can prevent that by installing insulation in the walls. Imagine the stuffing inside of your thickest, warmest jacket….
              But in your walls! Mind. Blown.
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
      { windSpeed: '', atmosphere: '', astronomy: '', conditions: '', elderHeartRate: '', elderLightSensor: '', elderGPS: '', elderAccelerometer: '', gasSensor: '', energyMain: '', electricityUsage: '', electricityAppliances: '', electricityEvents: '', water: ''}
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
        windSpeed: parsed['QmWYaxscTPj79NHLnFEuUbKpZx3d4zHBK2ZRNgqrnF9s5n']['data']['channel']['wind']['speed'],
        atmosphere: parsed['QmWYaxscTPj79NHLnFEuUbKpZx3d4zHBK2ZRNgqrnF9s5n']['data']['channel']['atmosphere'],
        astronomy: parsed['QmWYaxscTPj79NHLnFEuUbKpZx3d4zHBK2ZRNgqrnF9s5n']['data']['channel']['astronomy'],
        conditions: parsed['QmWYaxscTPj79NHLnFEuUbKpZx3d4zHBK2ZRNgqrnF9s5n']['data']['channel']['item']['condition'],
        elderHeartRate: parsed['QmXUHQ2KBmSxaiEbB5eFVGGmSsPnd5KpnRqGWvtFUjWo5a']['data']['heartRate'],
        elderLightSensor: parsed['QmXUHQ2KBmSxaiEbB5eFVGGmSsPnd5KpnRqGWvtFUjWo5a']['data']['lightSensor'],
        elderGPS: parsed['QmXUHQ2KBmSxaiEbB5eFVGGmSsPnd5KpnRqGWvtFUjWo5a']['data']['gps'],
        elderAccelerometer: parsed['QmXUHQ2KBmSxaiEbB5eFVGGmSsPnd5KpnRqGWvtFUjWo5a']['data']['accelerometer'],
        gasSensor: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['gasSensor'],
        energyMain: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['smappee']['main'],
        electricityUsage: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['smappee']['usage']['electricity'],
        electricityAppliances: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['smappee']['usage']['appliances'],
        electricityEvents: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['smappee']['events'],
        water: parsed['QmdhnZLVkkPyEoyxGf238pPPMsKNjPS3cC3sFzSW3cbnQA']['water']
      }

      _this.setState({state})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const sound = (randomIntBtwNumbers(0,1))
    const recentInteraction = (randomIntBtwNumbers(0,1))
    const humidity = (this.state.state.atmosphere.humidity)
    const pressure = (this.state.state.atmosphere.pressure)
    const visibility = (this.state.state.atmosphere.visibility)
    const sunrise = (this.state.state.astronomy.sunrise)
    const sunset = (this.state.state.astronomy.sunset)
    const weatherTemp = (this.state.state.conditions.temp)
    const weatherText = (this.state.state.conditions.text)
    const GPSlat = (this.state.state.elderGPS.lat)
    const GPSlong = (this.state.state.elderGPS.long)
    const xAccel = (this.state.state.elderAccelerometer.xAccel)
    const yAccel = (this.state.state.elderAccelerometer.yAccel)
    const zAccel = (this.state.state.elderAccelerometer.zAccel)
    const O3 = (this.state.state.gasSensor.O3)
    const CO = (this.state.state.gasSensor.CO)
    const CO2 = (this.state.state.gasSensor.CO2)
    const NO = (this.state.state.gasSensor.NO)
    const NO2 = (this.state.state.gasSensor.NO2)
    const CH4 = (this.state.state.gasSensor.CH4)
    const H2 = (this.state.state.gasSensor.H2)
    const elecMain = (this.state.state.energyMain['totalEnergy'])
    const elecUsage = (this.state.state.electricityUsage['wattHours'])
    const elecAppliances = (this.state.state.electricityAppliances)
    const elecEvents = (this.state.state.electricityEvents)
    const waterMain = (this.state.state.water['main'])
    const waterAppliances = (this.state.state.water['appliances'])
    const waterEvents = (this.state.state.water['events'])
    // const price0 = (this.state.state.price)? `$${this.state.state.price}` : ''
    // const price1 = (this.state.state[1].price)? `$${this.state.state[1].price}` : ''
    // const chargeTime0 = (this.state.state.timeCharging)? `Been charging for ${this.state.state.timeCharging.substring(0,6)} minutes` : ''
    // const chargeTime1 = (this.state.state[1].timeCharging)? `Been charging for ${this.state.state[1].timeCharging.substring(0,6)} minutes` : ''
    // const doing = (this.state.state.changeinPercent.includes('-')) ? 'poorly' : 'well'
    // const stockchange = (this.state.state.changeinPercent.includes('+')) ? 'increased' : 'decreased'
    // <CarSpot sound={sound} recentInteraction={recentInteraction} windSpeed={this.state.state.windSpeed} left="100" top="100" atmosphere={this.state.state.atmosphere} astronomy={this.state.state.astronomy} conditions={this.state.state.conditions} elderHeartRate={this.state.state.elderHeartRate} elderLightSensor={this.state.state.elderLightSensor} elderGPS={this.state.state.elderGPS} elderAccelerometer={this.state.state.elderAccelerometer} gasSensor={this.state.state.gasSensor} energySmappee={this.state.state.energySmappee} water={this.state.state.water}/>

    return (
      <div>

        <CarSpot sound={sound} humidity={humidity} pressure={pressure} visibility={visibility} sunrise={sunrise} sunset={sunset} weatherTemp={weatherTemp} weatherText={weatherText} GPSlat={GPSlat} GPSlong={GPSlong} xAccel={xAccel} yAccel={yAccel} zAccel={zAccel} O3={O3} CO={CO} CO2={CO2} NO={NO} NO2={NO2} CH4={CH4} H2={H2} elecMain={elecMain} elecUsage={elecUsage} elecAppliances={elecAppliances} elecEvents={elecEvents} waterMain={waterMain} waterAppliances={waterAppliances} waterEvents={waterEvents} recentInteraction={recentInteraction} windSpeed={this.state.state.windSpeed} left="100" top="100" elderHeartRate={this.state.state.elderHeartRate} elderLightSensor={this.state.state.elderLightSensor} elecAppliances={elecAppliances}/>
      </div>
    )
  }
}



export default HomePage
