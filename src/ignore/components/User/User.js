import React, { Component } from 'react';

class User extends Component {
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
                this.props.setUser(user);
        })
    }

    googleSignIn () {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        //this.props.firebase.auth().signInWithPopup( provider )
        this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    googleSignOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return (
            <div>
                {this.props.user ?
                    <div>
                        <button onClick={() => this.googleSignOut()}>Sign Out</button>
                        <p>
                            {this.props.user.displayName}
                        </p>
                    </div>
                    :
                    <div>
                        <button onClick={() => this.googleSignIn()}>Sign In</button>
                        <p>
                            Guest
                        </p>
                    </div>
                }
            </div>
        );
    }
}

export default User;