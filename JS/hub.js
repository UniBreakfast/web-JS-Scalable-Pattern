'use strict';

  // pubsub hub - is a Hub module to use in Publish/Subscribe pattern
const hub = (() => {

    // private storage for existing subscriptions with callbacks for event handling
  const subs = {}

    // publish a named event for somebody subscribed to act upon given data
  const pub = function pub(e_name, data) {
    if (subs[e_name] && subs[e_name].length) subs[e_name].forEach(cb => cb(data));
    return this
  }

    // subscribe to be called with a callback upon a certain event
  function sub(e_name, cb) {
    if (!subs[e_name]) subs[e_name] = [cb];
    else subs[e_name].push(cb);
    return this
  }

    // unsubscribe certain callback from a certain event
  function unsub(e_name, cb) {
    if (subs[e_name]) {
      const item = subs[e_name];
      item.splice(item.indexOf(cb), 1);
    }
    if (!item.length) delete subs[e_name];
    return this
  }

    // list registered event subscriptions or callback handlers for a certain event
  const list = (e_name) => {
    if (e_name) return subs[e_name] || 'none';
    else return Object.keys(subs)
  }

    // public methods for hub object: publish (triggers event handlers), subscribe, unsubscribe, list
  const hub = {list};
  hub.pub   =   pub.bind(hub);
  hub.sub   =   sub.bind(hub);
  hub.unsub = unsub.bind(hub);

  return hub
})();

