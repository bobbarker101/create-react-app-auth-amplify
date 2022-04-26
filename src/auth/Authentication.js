import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setReports, setUser, setKeywords, setSenders, setSubscriptions, setSubscribers} from "../reducers/ReportsOptions";
import { API } from "aws-amplify/lib-esm/index";
import { Auth } from "aws-amplify/lib-esm/index";
import Amplify from "aws-amplify/lib-esm/index";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);
API.configure(aws_exports);
Auth.configure(aws_exports);


class Authentication extends Component {

    constructor(props)
    {
        super(props);
        this.init();
    }

    init = () => {
        /**
         * setting the user first to get user id and api key
         */
        Auth.currentAuthenticatedUser()
            .then((result) =>{
                let apiKey = 'RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE';//'keEi0hTZDr72Krh2BiYdG6VlF5vWlvGK8WXibhWC';//'RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE'
                result.apikey = apiKey;

                this.props.setUser(result);
                /**
                 * set reports
                 */
                API.get('MobileHelmV5', '/v5/reports', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    }
                })
                    .then((result) => {
                        this.props.setReports(result);
                    })
                    .catch((error) => {
                        console.log('ERROR');
                        console.log(error);
                        return error;
                    });
                /**
                 * set senders
                 */
                API.get('MobileHelmV5', '/v5/senders', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    }
                })
                    .then((result) => {
                        this.props.setSenders(result);
                    })
                    .catch((error) => {
                        console.log('ERROR');
                        console.log(error);
                        return error;
                    });
                /**
                 * set keywords
                 */
                API.get('MobileHelmV5', '/v5/keywords', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    }
                })
                    .then((result) => {
                        this.props.setKeywords(result);
                    })
                    .catch((error) => {
                        console.log('ERROR');
                        console.log(error);
                        return error;
                    });
                /**
                 * set subscriptions
                 */
                let apiName = 'MobileHelmV5';
                let path = '/v5/subscriptions';
                let myInit = {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': "RJnVqR4pjs5OmAIQKYEKG9pB9Iy88pbR7jcifvBE"
                    }
                };
                API.get(apiName, path, myInit)
                    .then((result) => {
                       this.props.setSubscriptions(result.data)

                    })
                    .catch((error) => {
                        console.log('ERROR');
                        console.log(error);
                        return error;
                    });
                /**
                 * set subscribers
                 */
                API.get('MobileHelmV5', '/v5/subscriptions/subscribers/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey
                    }
                })
                    .then((result) => {
                        this.props.setSubscribers(result)

                    })
                    .catch((error) => {
                        console.log('ERROR');
                        console.log(error);
                        return error;
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render()
    {
        const {children} = this.props;
        console.log(this.props)
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
    setReports: (reports) => dispatch(setReports(reports)),
    setSenders: (senders) => dispatch(setSenders(senders)),
    setKeywords: (keywords) => dispatch(setKeywords(keywords)),
    setSubscriptions: (subscriptions) => dispatch(setSubscriptions(subscriptions)),
    setSubscribers: (subscribers) => dispatch(setSubscribers(subscribers))
});

export default connect(null, mapDispatchToProps)(Authentication);
