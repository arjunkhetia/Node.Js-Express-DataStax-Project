var dse = require('dse-driver');
var distance = dse.types.distance;

var client = new dse.Client({
    contactPoints: ['127.0.0.1'],
    protocolOptions: {
      port: 9042
    },
    localDataCenter: 'SearchGraphAnalytics',
    graphOptions: {
        name: 'DataStaxGraph'
    },
    pooling: {
      coreConnectionsPerHost: {
        [distance.local]: 2,
        [distance.remote]: 1
      }
    }
});

var state = client.getState();

client.on('log', function(level, className, message, furtherInfo) {
  if (level != 'verbose') {
    console.log('cassandra: %s -- %s', level, message);
  }
});

module.exports = client;

module.exports.isLive = () => {
  var query = "g.V().none();";
  client.executeGraph(query).then((dseResult) => {
    console.log("DataStax Graph + Cassandra Database connected...\n");
  }).catch((err) => {
    console.log("Unable to connect DataStax Graph + Cassandra...\n");
  });
}

module.exports.close = () => {
  client.shutdown();
}
