import { notFound } from "next/navigation";
export default async function PastePage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/pastes/${id}`,
    { cache: "no-store" }
  );

  
  if (res.status === 404) {
    notFound();  //This makes http 404
  }
  

  const data = await res.json();

   return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222" }}>View Paste</h1>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          backgroundColor: "#f3f3f3",
          padding: "15px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "15px",
          lineHeight: "1.5",
          border: "1px solid #ddd",
        }}
      >
        {data.content}
      </pre>

      <div style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
        <p>Remaining Views: {data.remaining_views ?? "Unlimited"}</p>
        <p>Expires At: {data.expires_at}</p>
      </div>
    </div>
  );
}



