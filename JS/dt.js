'use strict';


  // data transporter is a module to push data to and to pull it from the storage (database)
const dt = (() => {

  var data = { headers: ['name', 'age'],
               rows: [['John', 20],
                      ['Alex', 30]] }

  function load() { return data }

  function load2(path, params) {
    var result = {};
    result[path]    = data[path];
    result[params] = data[params];
    return result
  }

    // pseudo database for testing
  var db = { users: { headers: ['id', 'name', 'nickname', 'confidence', 'eta_p'],
                      rows: [[1, 'John Smith', 'smithy', 24, 8],
                             [2, 'Alice White', 'snowhite', 13, 3],
                             [3, 'Ted West', 'cowboy', 60, 6]] },
             activities: { headers: ['id', 'activity', 'difficuly', 'usefulness', 'user_id'],
                           rows: [[1, 'run 1 mile', 6, 8, 1],
                                  [2, 'cooking new recipe', 5, 4, 2],
                                  [3, 'learn Spanish', 2, 7, 3]] }
           }

    // data routes
  const dr = {}

    // adds route and function to get data from certain place using certain parameters
  function add_route(r_name, path, params1) {
    dr[r_name] = {path: path, params: params1};

      // create new custom function for an added route with saved and optional additional parameters
    this[r_name] = function(params2) {
      const data = {};
      params1.forEach(param => data[param] = db[path][param]);
      params2.forEach(param => data[param] = db[path][param]);
      return data
    }
    return this
  }

    // use existing route with optional additional parameters
  function use_route(r_name, params2) {
    if (dr[r_name]) {
      const data = {}, path = dr[r_name].path, params1 = dr[r_name].params;
      params1.forEach(param => data[param] = db[path][param]);
      params2.forEach(param => data[param] = db[path][param]);
      return data
    }
    else return undefined
  }

    // public methods for dt object: add route to get/set data, use existing route
  const dt = {use_route}
  dt.load      =      load.bind(dt);
  dt.load2     =     load2.bind(dt);
  dt.add_route = add_route.bind(dt);
  return dt
})();
