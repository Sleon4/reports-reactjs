import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);

  const handleReadUsers = () => {
    axios.get("http://127.0.0.1:8000/api/users").then((res) => {
      setUsers(res.data.status ? [] : res.data);
    });
  };

  const handleSpreadsheet = () => {
    axios
      .get("http://127.0.0.1:8000/api/reports/spreadsheet", {
        responseType: "blob",
      })
      .then((res) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([res.data]));
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const handlePdf = () => {
    axios
      .get("http://127.0.0.1:8000/api/reports/pdf", {
        responseType: "blob",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/pdf" })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  useEffect(() => {
    handleReadUsers();
  }, []);

  return (
    <Container>
      <div className="my-5">
        <div className="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="success" onClick={handleSpreadsheet}>
            <i className="bi bi-file-earmark-spreadsheet"></i>
          </Button>

          <Button variant="danger" onClick={handlePdf}>
            <i className="bi bi-filetype-pdf"></i>
          </Button>
        </div>

        <Table hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>LAST NAME</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{user.idusers}</th>
                <td>{user.users_name}</td>
                <td>{user.users_lastname}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default App;
