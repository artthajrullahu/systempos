import { useState } from 'react';
import OrderPanel from './components/OrderPanel';

export default function App() {
  const [tables, setTables] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      occupied: false,
    }))
  );
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (table) => {
	setSelectedTable(table);
	setTables(tables.map(t =>
	  t.id === table.id ? { ...t, occupied: true } : t
	));
  };

  const handleClose = () => {
    setSelectedTable(null);
  };

  const handlePay = (tableId) => {
    setTables(tables.map(t =>
      t.id === tableId ? { ...t, occupied: false } : t
    ));
    setSelectedTable(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-8">☕ Kafene App</h1>
        <nav className="space-y-2">
          <button className="w-full text-left px-4 py-2 rounded bg-gray-700">
            🪑 Tavolinat
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-700">
            📊 Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-700">
            📦 Magazina
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-700">
            ⚙️ Cilësimet
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Tavolinat</h2>
        <div className="grid grid-cols-4 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => handleTableClick(table)}
              className={`rounded-xl p-6 shadow cursor-pointer hover:shadow-md transition-all ${
                table.occupied ? 'bg-red-50 border-2 border-red-300' : 'bg-white'
              }`}
            >
              <p className="text-gray-500 text-sm">Tavolina</p>
              <p className="text-3xl font-bold">{table.id}</p>
              {table.occupied ? (
                <span className="text-red-500 text-sm font-medium">● Zënë</span>
              ) : (
                <span className="text-green-500 text-sm font-medium">● Lirë</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Panel */}
      {selectedTable && (
        <OrderPanel
          table={selectedTable}
          onClose={handleClose}
          onPay={handlePay}
        />
      )}

    </div>
  );
}