import { useEffect, useState } from "react";

import Table from "./Table";
import { getData } from "./data";

import "./ClientTable.scss";

const clientsColumns = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    id: "icon",
    Header: "",
    accessor: "icon",
  },
];

function isAMatch(word, query) {
  return word.toLowerCase().includes(query.toLowerCase());
}
function useData({ query }) {
  const [data, setData] = useState();
  useEffect(() => {
    getData().then(setData);
  }, []);

  // TODO: Make search better
  function getFilteredData() {
    return data.filter((user) => {
      return [
        isAMatch(user.firstName, query),
        isAMatch(user.lastName, query),
        isAMatch(user.phone, query),
        isAMatch(user.email, query),
      ].some((v) => v);
    });
  }

  const filteredData = data && query ? getFilteredData() : data;

  // TODO: Implement error handling
  return { data: filteredData, error: null };
}

function ClientsTable() {
  const [query, setQuery] = useState("");
  const { data } = useData({ query });

  if (!data) {
    return "Loading..."; // Todo: Implement loader
  }

  return (
    <div className="client-table">
      <div className="input-container">
        {/* TODO: Add Icon */}
        <input
          type="text"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          placeholder="Looking for something specific? Search Here..."
        />
      </div>
      {data.length > 0 ? (
        <Table columns={clientsColumns} data={data} />
      ) : (
        <div>
          <p>No results, try another query!</p>
        </div>
      )}
    </div>
  );
}

export default ClientsTable;
