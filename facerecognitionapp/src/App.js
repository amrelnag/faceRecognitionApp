import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignInForm from './components/SignInForm/SignInForm';
import RegisterationForm from './components/RegisterationForm/RegisterationForm';

const particlesOptions = {
  particles: {
      number: {
          value: 50
      },
      size: {
          value: 3
      }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
} 

const app = new Clarifai.App({
  apiKey: '357b4bfe8b3b41bfa754821a6367e5ef'
});

class App extends Component{

  constructor() {
    super();
    this.state = {
      input: '',
      box: {},
      route: 'signIn',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: '' 
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined 
      }
    })
  }
  calculateFaceLocation = (data) => {
    console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const boxDimen = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('uploadedImage');
    const width = Number(image.width);
    const height = Number (image.height);
    console.log(height);
    console.log(boxDimen.bottom_row)
    return {
      leftCol: boxDimen.left_col * width,
      topRow: boxDimen.top_row * height,
      rightCol: width - (boxDimen.right_col * width),
      bottomRow: height - (boxDimen.bottom_row * height),

    }
  }

  highlightFaces = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.highlightFaces(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (toRoute) => {
    this.setState({route: toRoute })
  }
  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  checkRoute = (toRoute) => {
    console.log(toRoute);
    //this.wait(5000);
    switch (toRoute) {
      case 'signIn':
        return <div><SignInForm onRouteChange={this.onRouteChange}/></div>;
      case 'home':
        return <div>
                <Navigation onRouteChange={this.onRouteChange}/>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
              </div>;
      case 'Register':
        return <div>
                <RegisterationForm loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
               </div>;
      default:
    }
  }

  render () {
    
    return  (<div className="App">
      <Particles className='particles' 
        params={particlesOptions} 
      />
      {
        this.checkRoute(this.state.route)
      }
      
    </div>);
  };
}

export default App;
