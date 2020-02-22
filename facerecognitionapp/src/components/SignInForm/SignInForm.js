import React from 'react';

class SignInForm extends React.Component {

    constructor () {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmit = () => {
        console.log(this.state);
        fetch('http://localhost:3001/signIn', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
           
            //this.wait(1000);
            console.log(data);
            if (data === 'SUCCESS') {
                this.props.onRouteChange('home')
            } else {
                this.props.onRouteChange('signIn')
            }
        })
        
    }
    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }

   

    render () {
       return (<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <div className= 'br2 shadow-2'>
                <main className="pa4 black-80 ">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/>Remember me</label>
                         </fieldset>
                        <div className="">
                            <input onClick = {this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a onClick = {() => this.props.onRouteChange('Register')} href="#0" className="f6 link dim black db">Sign up</a>
                            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                        </div>
                    </form>
                </main>
            </div>
        </article>);
    }
}

export default SignInForm;