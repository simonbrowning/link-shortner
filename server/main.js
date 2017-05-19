import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import {WebApp} from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links',function(){
    return Links.find({});
  })
});

//Exucted whenever a url matches
//localhost:3000/abcd
function onRoute(req, res, next){
  //Check token exists in links Collection
  const link = Links.findOne({token:req.params.token});
  if (link) {
    //update record with click usage
    Links.update(link,{$inc: {clicks: 1}});
  //route request to long url
  res.writeHead("307",{location: link.url});
  res.end();
  } else {
    //else send to react App
    next();
  }

}

const middleware = ConnectRoute(function(router){
  router.get('/:token',onRoute);
})
WebApp.connectHandlers.use(middleware);
