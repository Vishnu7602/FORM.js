// Import the getPSConnection function from the PlanetscaleDB library
import getPSConnection from "@/components/database";
// Define an asynchronous function to handle POST requests
export async function POST(req) {
  // Parse the JSON request body into an array of rows
  const rows = await req.json();
  console.log(rows);

  try {
    // Get a connection to the PlanetscaleDB database
    const conn = await getPSConnection();

    // Prepare the batch insert query by creating an array of values and placeholders
    const values = rows.flatMap(row => [row.name, row.age, row.gender, row.college]);
    const placeholders = rows.map(() => '(?, ?, ?, ?)').join(', ');
    
    // Define the SQL query for inserting or updating rows in the inventory2 table
    const insertQuery = `
      INSERT INTO vishnu_1(name,age,gender,college)
      VALUES ${placeholders}
    `;

    // Execute the batch insert query using the prepared values
    await conn.query(insertQuery, values);

    // Close the database connection
    await conn.end();
    
    // Return a successful response with a message indicating the data was updated
    return new Response(JSON.stringify({ message: 'Data updated successfully' }), { status: 200 });
  } catch (error) {
    // Log the error and return an error response with a message indicating there was an issue updating the data
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error updating data' }), { status: 500 });
  }
}