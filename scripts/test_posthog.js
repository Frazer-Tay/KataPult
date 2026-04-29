const { PostHog } = require('posthog-node');

const client = new PostHog(
  'phc_zpi4smVqjohH5CSHn3azTz49aGJiTU3mboSLT84pGyr4',
  { host: 'https://us.i.posthog.com' }
);

client.capture({
  distinctId: 'test-user-id-123',
  event: 'test_event_from_node'
});

client.flush().then(() => {
  console.log("Flushed PostHog events");
  process.exit(0);
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
