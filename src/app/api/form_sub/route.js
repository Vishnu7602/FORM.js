// Import the getPSConnection function from the PlanetscaleDB library
import getPSConnection from "@/components/database";

// Define an asynchronous function to handle POST requests
export async function POST(req) {
  // Parse the JSON request body into an object
  const row = await req.json();
  console.log('Request body:', row);

  try {
    // Get a connection to the PlanetscaleDB database
    const conn = await getPSConnection();

    // Prepare the values for the insert query
    const values = [row.name, row.age, row.gender, row.college];
    
    // Define the SQL query for inserting a row into the vishnu_1 table
    const insertQuery = `
      INSERT INTO students(name, age, gender, college)
      VALUES (?, ?, ?, ?)
    `;

    // Execute the insert query using the prepared values
    await conn.query(insertQuery, values);

    // Close the database connection
    await conn.end();
    
    // Return a successful response with a message indicating the data was inserted
    return new Response(JSON.stringify({ message: 'Data inserted successfully' }), { status: 200 });
  } catch (error) {
    // Log the error and return an error response with a message indicating there was an issue inserting the data
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error inserting data' }), { status: 500 });
  }
}