import Amplify from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';

export default class AuthClass {
    configure = () => {
      Amplify.configure({
        Auth: {
            identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
            region: process.env.REACT_APP_REGION,
            userPoolId: process.env.REACT_APP_USER_POOL_ID,
            userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT
          }
      });
    }

    connectToMQTT = () => {
        Amplify.addPluggable(
          new AWSIoTProvider({
            aws_pubsub_region: process.env.REACT_APP_REGION,
            aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
          })
        );
    };
    
    getDataFromTopic = (topic) => {
        return Amplify.PubSub.subscribe(topic);
    };
};