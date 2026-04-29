const crypto = require('crypto');

const apiKey = 'phc_zpi4smVqjohH5CSHn3azTz49aGJiTU3mboSLT84pGyr4';
const host = 'https://us.i.posthog.com';

async function main() {
  const response = await fetch(`${host}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      event: 'test_event_from_node',
      distinct_id: `test-user-${crypto.randomUUID()}`,
      properties: {
        source: 'scripts/test_posthog.js'
      }
    })
  });

  const body = await response.text();
  console.log(`PostHog status: ${response.status}`);
  console.log(body);

  if (!response.ok) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
