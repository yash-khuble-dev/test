const fs = require("fs/promises");
const path = require("path");

async function main() {
  try {
    const response = await fetch(
      "http://192.168.0.226:8000/api/company/search-company",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          authorization:
            "Bearer cd6cb6b8d011eb794e3c968e0e4f8dc3a8af4230d652dd056381a2ea21c2ceb3",
          "cache-control": "no-cache",
          companytoken:
            "eyJpdiI6Imp4ZElnU3dGaWZxRHlmUWF3WC9wNnc9PSIsInZhbHVlIjoiU3phZHR6WWFMRHQ0LzYrZDZxMi9hRG1kcGUwOW9kZVFLemp6SVl1MEg3cz0iLCJtYWMiOiIwYjRhNWQ5YWIwZmFkNGY3NWQxZTMwMmVlNWJhM2FhN2Q1ZWY0Yjg5ZmYwZWY3MThiYjQ3ZmE1ZDNkY2NlNjE5IiwidGFnIjoiIn0=",
          "content-type": "application/json",
          pragma: "no-cache",
          showloader: "true",
          Referer: "http://localhost:3000/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: JSON.stringify({
          gst: "37AABCT0601L1ZJ",
          search_v2: true,
          is_paid: true,
        //   is_recent_search: true,
        //   r_id: 5338,
        }),
      }
    );

    console.log("Status:", response.status, response.statusText);

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
      console.log("Response JSON:");
      console.log(data);
    } catch (error) {
      console.log("Invalid JSON response:");
      console.log(text);
      return;
    }

    const filePath = path.resolve(process.cwd(), "response.json");

    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );

    console.log("Response saved at:", filePath);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();