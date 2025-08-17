import React, { useState } from "react";
import Plot from "react-plotly.js";
import { FaFileUpload, FaChartBar, FaDownload } from "react-icons/fa";

const chartOptions = ["Line", "Bar", "Pie"];

const sampleData = {
  x: ["Jan", "Feb", "Mar", "Apr", "May"],
  y: [10, 15, 13, 17, 21],
};

const DataVisualizationScreen = () => {
  const [chartType, setChartType] = useState("Line");
  const [datasetName, setDatasetName] = useState("No dataset selected");

  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];
    if (file) setDatasetName(file.name);
  };

  const downloadChart = () => {
    const chartElement = document.querySelector(".js-plotly-plot svg");
    if (chartElement) {
      const svgData = new XMLSerializer().serializeToString(chartElement);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const renderChart = () => {
    const config = { responsive: true };

    const layout = {
      title: `${chartType} Chart`,
      paper_bgcolor: "#2A2A40",
      plot_bgcolor: "#2A2A40",
      font: { color: "white", family: "Poppins" },
      margin: { t: 40, l: 40, r: 20, b: 40 },
    };

    switch (chartType) {
      case "Line":
        return (
          <Plot
            data={[{
              x: sampleData.x,
              y: sampleData.y,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "#4ade80" },
            }]}
            layout={layout}
            config={config}
          />
        );
      case "Bar":
        return (
          <Plot
            data={[{
              x: sampleData.x,
              y: sampleData.y,
              type: "bar",
              marker: { color: "#60a5fa" },
            }]}
            layout={layout}
            config={config}
          />
        );
      case "Pie":
        return (
          <Plot
            data={[{
              values: sampleData.y,
              labels: sampleData.x,
              type: "pie",
              marker: { colors: ["#34d399", "#60a5fa", "#f87171", "#fbbf24", "#a78bfa"] },
            }]}
            layout={{ ...layout, showlegend: true }}
            config={config}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1E1E2F] text-white font-poppins p-6 space-y-6 overflow-auto">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <FaChartBar className="text-green-400" /> Data Visualization Lab
          </h1>
          <p className="text-sm text-gray-400">Visualize your datasets with dynamic charts</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <label className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 text-sm">
            <FaFileUpload /> Upload Dataset
            <input type="file" onChange={handleDatasetUpload} className="hidden" />
          </label>
          <span className="text-green-400 text-sm font-medium">
            📂 {datasetName}
          </span>
        </div>
      </header>

      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">Chart Type:</span>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-[#2A2A40] border border-gray-600 rounded-md px-3 py-1 text-white focus:outline-none"
          >
            {chartOptions.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={downloadChart}
          className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-md text-sm hover:bg-green-700"
        >
          <FaDownload /> Export Chart
        </button>
      </div>

      <div className="bg-[#2A2A40] rounded-xl p-6 shadow-lg border border-gray-700 min-h-[400px]">
        {renderChart()}
      </div>
    </div>
  );
};

export default DataVisualizationScreen;
