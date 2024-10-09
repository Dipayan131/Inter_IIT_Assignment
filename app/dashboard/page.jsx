'use client';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedGodowns, setExpandedGodowns] = useState({});
  const [selectedGodownItems, setSelectedGodownItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const fetchItems = async (godownId) => {
    const res = await fetch('/api/items');
    const data = await res.json();
    const godownItems = data.filter(item => item.godown === godownId);
    setSelectedGodownItems(godownItems);
    setSelectedItem(null);
  };

  const toggleGodownExpansion = (godownId) => {
    setExpandedGodowns((prev) => ({
      ...prev,
      [godownId]: !prev[godownId],
    }));
  };

  const renderGodownTree = (parentId = null) => {
    return locations
      .filter(location => location.parent_godown === parentId)
      .map((location) => (
        <div key={location.id} className="ml-4">
          <div
            onClick={() => {
              toggleGodownExpansion(location.id);
              fetchItems(location.id);
            }}
            className="cursor-pointer flex justify-between items-center p-2 hover:bg-pink-100 transition duration-300 ease-in-out rounded-lg shadow-md"
          >
            <span className="text-gray-800 font-semibold">{location.name}</span>
            <span className="text-pink-500">{expandedGodowns[location.id] ? '-' : '+'}</span>
          </div>
          {expandedGodowns[location.id] && renderGodownTree(location.id)}
        </div>
      ));
  };

  const renderItemList = () => {
    return selectedGodownItems.length > 0 ? (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3 text-blue-800 border-b-2 border-blue-500 pb-2">Items in Godown</h2>
        <ul className="space-y-3">
          {selectedGodownItems.map((item) => (
            <li
              key={item.item_id}
              onClick={() => setSelectedItem(item)}
              className="cursor-pointer p-3 bg-blue-50 hover:bg-blue-100 transition duration-300 ease-in-out rounded-md shadow-md flex justify-between items-center"
            >
              <span className="text-gray-800 font-medium">{item.name}</span>
              <span className={`text-sm font-semibold ${item.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className="p-4 text-gray-500">No items found in this godown.</p>
    );
  };

  const renderItemDetail = () => {
    return selectedItem ? (
      <div className="p-6 bg-gradient-to-r from-pink-100 to-blue-100 shadow-lg rounded-lg border border-gray-200 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedItem.name}</h2>
        <div className="relative w-full h-64">
          <img
            src={selectedItem.image_url}
            alt={selectedItem.name}
            className="w-full h-full object-cover rounded-md shadow-md"
          />
        </div>
        <div className="text-gray-800 space-y-2">
          <p><strong>Category:</strong> {selectedItem.category}</p>
          <p><strong>Price:</strong> ${selectedItem.price}</p>
          <p><strong>Status:</strong> <span className={`${selectedItem.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>{selectedItem.status}</span></p>
          <p><strong>Brand:</strong> {selectedItem.brand}</p>
          <p><strong>Quantity:</strong> {selectedItem.quantity}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Attributes:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li><strong>Type:</strong> {selectedItem.attributes.type}</li>
            <li><strong>Material:</strong> {selectedItem.attributes.material}</li>
            <li><strong>Warranty:</strong> {selectedItem.attributes.warranty_years} year(s)</li>
          </ul>
        </div>
      </div>
    ) : (
      <p className="p-6 text-gray-500">Select an item to view its details.</p>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Sidebar: Godown Tree */}
      <div className="w-1/3 bg-white p-4 border-r border-gray-300 shadow-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 text-pink-600">Godown Structure</h1>
        <div>{renderGodownTree()}</div>
      </div>

      {/* Main Content: Item List */}
      <div className="w-1/3 bg-white p-4 border-r border-gray-300 shadow-lg overflow-y-auto">
        {renderItemList()}
      </div>

      {/* Right Panel: Item Details */}
      <div className="w-1/3 p-6 overflow-y-auto">
        {renderItemDetail()}
      </div>
    </div>
  );
};

export default Dashboard;
