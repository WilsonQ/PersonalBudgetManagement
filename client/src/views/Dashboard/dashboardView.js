import React, { useState, useEffect } from "react";
import { getOperations } from "../../service/api/apiBackend";
export default function DashboardView() {
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    console.log("Empezando el get");
    async function getData() {
      console.log("hola");
      const dataResponse = await getOperations();
      setOperations(dataResponse.data);
      console.log("tengo la data", dataResponse);
    }
    getData();
  }, [setOperations]);

  const handleChange = () => {
    setOperations([{ concept: "prueba" }]);
  };

  return (
    <div>
      <h1>operations</h1>
      <div>
        {/* {operations && operations.map((operation) => operation.concept)} */}
      </div>
    </div>
  );
}
