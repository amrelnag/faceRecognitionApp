import React from 'react';

class RegisterationForm extends React.Component {

    constructor () {
        super();
        this.state = {
            regEmail: '',
            regPassword: '',
            regName: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({regEmail: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({regName: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({regPassword: event.target.value})
    }

    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }

    onSubmit = () => {
        console.log(this.state);
        this.wait(2000);
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.regEmail,
                password: this.state.regPassword,
                regName: this.state.regName
            })
        })
        .then(response => response.json())
        .then(user => {
           
            //this.wait(1000);
            
            console.log('Registering')
            this.wait(2000);
            console.log(user);
            this.wait(2000);
            if (user) {
                this.props.loadUser(user);
                this.props.onRouteChange('home')
            } else {
                this.props.onRouteChange('signIn')
            }
        })
        
    }
    render() {
        const {onRouteChange} = this.props;
        return (
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <div className= 'br2 shadow-2'>
                <main className="pa4 black-80 ">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Registeration Form</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="text">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="user-name"  id="user-name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                        <div className="">
                            <input onClick = {this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign Up!"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a onClick = {() => onRouteChange('signIn')} href="#0" className="f6 link dim black db">Already have email? Sign In!</a>
                        </div>
                    </form>
                </main>
            </div>
        </article>);
    };
}

export default RegisterationForm;