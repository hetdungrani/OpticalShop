import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalAdmins: 0,
    totalOrders: 0,
  });
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard-summary", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        console.error(err);
      });

    const ctx = document.getElementById("myBarChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Monthly Sales",
            data: [12, 19, 3, 5, 2, 3, 7],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  const StatCard = ({ title, value, className }) => (
    <div
      className={`rounded-xl p-6 text-white shadow-md transition hover:-translate-y-1 ${className}`}
    >
      <h1 className="text-4xl font-bold mb-2">{value}</h1>
      <h4 className="text-lg font-medium">{title}</h4>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6 mb-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          className="bg-gradient-to-r from-blue-400 to-cyan-400"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          className="bg-gradient-to-r from-green-400 to-teal-300"
        />
        <StatCard
          title="Total Admins"
          value={stats.totalAdmins}
          className="bg-gradient-to-r from-pink-400 to-yellow-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Total Reviews"
          value="0"
          className="bg-gradient-to-r from-pink-200 to-indigo-300"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          className="bg-gradient-to-r from-green-200 to-blue-200"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md mt-10 p-6 w-full max-w-5xl mx-auto">
        <canvas id="myBarChart"></canvas>
      </div>
    </div>
  );
}

export default AdminDashboard;
