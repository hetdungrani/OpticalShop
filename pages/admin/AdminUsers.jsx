import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 mt-10 bg-white shadow-md rounded-lg max-w-7xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Registered Users
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-blue-600 text-white text-sm uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 text-center">Registered ID</th>
              <th className="py-3 px-4 text-center">Username</th>
              <th className="py-3 px-4 text-center">Address</th>
              <th className="py-3 px-4 text-center">Phone Number</th>
              <th className="py-3 px-4 text-center">Email</th>
              <th className="py-3 px-4 text-center">Password</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.length === 0 ? (
              <tr key="no-users">
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.rid || index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  <td className="py-2 px-4 text-center">{user.username}</td>
                  <td className="py-2 px-4 text-center">{user.address}</td>
                  <td className="py-2 px-4 text-center">{user.phone}</td>
                  <td className="py-2 px-4 text-center">{user.email}</td>
                  <td className="py-2 px-4 text-center">{user.password}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
